import { Injectable, Logger, UploadedFile } from '@nestjs/common';
import { Job, Queue } from 'bull';
import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import {
  MINT_QUEUE,
  ONCHAIN_DATA_QUEUE,
  SET_DBUPDATE_QUEUE,
  VC_QUEUE,
  SET_MINT_NFT,
  SET_MINT_SINGLE_NFT,
  SET_ONCHAIN_DATA,
  CONTRIBUTE_QUEUE,
  SET_APPROVE_QUEUE,
  SET_CONTRIBUTE_QUEUE,
  SET_IMAGE_PROCESS,
  IMAGE_QUEUE,
  UPLOAD_QUEUE,
  SET_UPLOAD_PROCESS,
  SET_CSV_MINT,
  SET_THEME,
  RESERVE_NFT,
  CLAIM_NFT,
  SET_PROCESS_VC,
  SEND_VC_LINK,
  UPDATE_CIW,
  UPDATE_PAID_SCHOOL,
} from '../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import {
  claimNft,
  getArtScript,
  getScriptData,
  mintNFT,
  mintSingleNFT,
  reserveNft,
  updateImageHash,
} from 'src/utils/ethers/transactionFunctions';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolData } from '../types/mintdata.types';
import { MintStatus } from '@prisma/application';
import { jobOptions } from '../config/bullOptions';
import { ContributeDataService } from 'src/contribute/contribute.service';
import { SchoolService } from 'src/schools/schools.service';
import generateP5Image from 'src/p5/generateP5';
import decodeBase64Image from 'src/utils/ipfs/decodeImage';
import uploadFile from 'src/utils/ipfs/ipfsAdd';
import { hexStringToBuffer } from 'src/utils/string-format';
import { ContributorService } from 'src/contributor/contributor.service';
import { MailService } from '../mailer.service';
import { checkTransactionHash } from 'src/utils/ethers/checkTransaction';
import { SchoolActivation } from 'src/schools/dto/reserve-nft.dto';
// import { checkTxnStatus } from 'src/utils/gasPrice';

@Injectable()
@Processor(ONCHAIN_DATA_QUEUE)
export class QueueProcessor {
  private readonly _logger = new Logger(QueueProcessor.name);

  constructor(
    @InjectQueue(IMAGE_QUEUE) private readonly _imageQueue: Queue,

    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private contributorService: ContributorService,
    private readonly _prismaService: PrismaAppService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed({ name: CLAIM_NFT })
  public onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: `Something went wrong with transactions!! ${error.message}`,
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @OnQueueFailed({ name: UPDATE_PAID_SCHOOL })
  public async onSchoolActivationError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade >= job.opts.attempts) {
      try {
         const school = await this._prismaService.school.update({
          where: {
            id: job.data.activationData?.schoolId,
            minted: MintStatus.ISMINTING,
          },
          data: {
            minted: MintStatus.NOTMINTED,
            themeId: null,
          },
        });
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: `Something went wrong with transactions!! ${error.message}`,
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  

  @Process(SET_ONCHAIN_DATA)
  public async sendOnchainData(job: Job<{ h: number }>) {
    this._logger.log(`Sending transaction to blockchain`);

    try {
      //transaction to blockchain
      setTimeout(() => {
        this._logger.log(`Transaction completed ${job.data.h}`);
      }, 10000);
    } catch {
      this._logger.error(`Failed to send transactions to blockchain`);
    }
  }

  @Process(CLAIM_NFT)
  public async claimNft(job: Job<{ email: string; walletAddress: string; schoolId: string }>) {
    this._logger.log(`Sending transaction to blockchain`);
    const email = job.data.email;
    const walletAddress = job.data.walletAddress;
    try {
      const tx = await claimNft(walletAddress, email);
      const txReceipt = await tx.wait();
      if (txReceipt.status == 1) {
        this.contributorService.claimNft(job.data.email, job.data.walletAddress, job.data.schoolId);
      } else {
        this._logger.error(`Failed to claim NFT for ${email}`);
        throw new Error(`Failed to claim NFT for ${email}`);
      }
    } catch (error) {
      this._logger.error(`Failed to send transactions to blockchain`);
      throw new Error(`Failed to send transactions to blockchain, ${error}`);
    }
  }

  @Process(UPDATE_PAID_SCHOOL)
  public async updatePaidSchool(
    job: Job<{ activationData: SchoolActivation; }>,
  ) {
    const schoolId = job.data.activationData.schoolId;
    const themeId = job.data.activationData.themeId;
    const contributorData = job.data.activationData.contributorData;
    const transactionHash = job.data.activationData.transactionHash;

    try {
      const txReceipt = await checkTransactionHash(transactionHash);
      if (txReceipt.status === 'success') {
        const updatedSchool = await this._prismaService.school.update({
          where: {
            id: schoolId,
          },
          data: {
            minted: MintStatus.MINTED,
            themeId: themeId,
          },
        });
        this._imageQueue.add(SET_IMAGE_PROCESS, { id: updatedSchool.giga_school_id }, jobOptions);

  
        this.contributorService.addPayingContributor(contributorData);
      } else if(txReceipt.status === 'failed') {
        await this._prismaService.school.update({
          where:{
            id: schoolId,
            minted: MintStatus.ISMINTING,
          },
          data:{
            minted: MintStatus.NOTMINTED,
            themeId: null,
          }
        })
      
      }
      else if(txReceipt.status === 'Pending') {
        this._logger.warn(`Transaction is still pending for school ID: ${schoolId}`);
        throw new Error(`Transaction is still pending for school ID: ${schoolId}`);
      }
    } catch (error) {
      this._logger.error(`Failed to update paid school: ${error.message}`);
      throw new Error(`Failed to update paid school: ${error.message}`);
    }
  }
}

@Injectable()
@Processor(MINT_QUEUE)
export class MintQueueProcessor {
  private readonly _logger = new Logger(MintQueueProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private readonly _prismaService: PrismaAppService,
    private contributorService: ContributorService,
    @InjectQueue(MINT_QUEUE) private readonly _mintQueue: Queue,
    @InjectQueue(IMAGE_QUEUE) private readonly _imageQueue: Queue,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed({ name: SET_MINT_NFT || SET_MINT_SINGLE_NFT })
  public async onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        await this._mintQueue.add(
          SET_DBUPDATE_QUEUE,
          { ids: job.data.ids, status: MintStatus.NOTMINTED },
          jobOptions,
        );
      } catch (error) {
        this._logger.error(
          `Failed queue DB update ${job.id} of type ${job.name}: ${error.message}`,
          error.stack,
        );
      }
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: `Something went wrong with transactions while minting!!${job.data.ids}, error: ${error.message}`,
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @OnQueueFailed({ name: SET_DBUPDATE_QUEUE })
  public async onErrorDB(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: `Something went wrong while updating database!! ${job.data.ids}, error: ${error.message}`,
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process(SET_DBUPDATE_QUEUE)
  public async sendDBUpdate(
    job: Job<{
      status: MintStatus;
      ids: string[];
      themeId?: string;
      email?: string;
      walletAddress?: string;
      hash?: string;
    }>,
  ) {
    this._logger.log(`Updating database`);
    // Update theme ID and school to minted
    const schools = await this._prismaService.school.updateMany({
      where: {
        id: {
          in: job.data.ids,
        },
      },
      data: {
        minted: job.data.status,
        themeId: job.data.themeId,
      },
    });

    if (schools.count !== job.data.ids.length) {
      throw new Error(`No. of schools updated in database is not equal to no of schools minted`);
    }
  }

  @Process(SET_MINT_NFT)
  public async sendMintNFT(
    job: Job<{ mintData: SchoolData[]; ids: string[]; giga_ids: string[] }>,
  ) {
    this._logger.log(`Sending mint nft to blockchain`);
    let status = true;
    const tx = await mintNFT(
      'NFT',
      this._configService.get<string>('NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS'),
      job.data.mintData,
      job.data.giga_ids,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
      status = false;
    }

    if (txReceipt.status === 1) {
      try {
        this._mintQueue.add(SET_THEME, { schoolids: job.data.giga_ids }, jobOptions);
        for (let i = 0; i < job.data.giga_ids.length; i++) {
          this._imageQueue.add(SET_IMAGE_PROCESS, { id: job.data.giga_ids[i] }, jobOptions);
        }
      } catch (error) {
        this._logger.log(`Error generating image: ${error}`);
      }
    }

    return this.statusCheckandDBUpdate(status, job.data.ids);
  }

  @Process(SET_MINT_SINGLE_NFT)
  public async sendSingleMintNFT(
    job: Job<{
      mintData: SchoolData;
      id: string;
      giga_id: string;
      email?: string;
      themeId?: string;
    }>,
  ) {
    this._logger.log(`Sending single mint nft to blockchain`);
    let status = true;
    let txReceipt: any;
    try {
      const tx = await mintSingleNFT(
        'NFT',
        this._configService.get<string>('NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS'),
        job.data.mintData,
        job.data.giga_id,
      );
      txReceipt = await tx.wait();
      if (txReceipt.status !== 1) {
        status = false;
      }
      if (txReceipt.status === 1) {
        try {
          // function to reserve the NFT
          this._mintQueue.add(
            RESERVE_NFT,
            { giga_school_id: job.data.giga_id, email: job.data.email, schoolId: job?.data?.id },
            jobOptions,
          );
          this._imageQueue.add(SET_IMAGE_PROCESS, { id: job.data.giga_id }, jobOptions);
        } catch (error) {
          this._logger.log(`Error generating image: ${error}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return this.statusCheckandDBUpdate(
      status,
      [job.data.id],
      job.data.themeId,
      job.data.email,
      txReceipt.hash,
    );
  }

  private async statusCheckandDBUpdate(
    status: boolean,
    ids: string[],
    themeId?: string,
    email?: string,
    hash?: string,
  ) {
    if (status) {
      this._logger.log(`NFTs minted successfully`);
      try {
        await this._mintQueue.add(
          SET_DBUPDATE_QUEUE,
          {
            ids: ids,
            status: status ? MintStatus.MINTED : MintStatus.NOTMINTED,
            email,
            hash,
            themeId,
          },
          jobOptions,
        );
      } catch (error) {
        this._logger.error(`Error updating database: ${error}`);
      }
      return { message: 'queue added successfully', statusCode: 200 };
    } else {
      this._logger.error(`NFTs minted transaction failed`);
      throw new Error('NFTs minted transaction failed');
    }
  }

  @Process(SET_THEME)
  public async processTheme(job: Job<{ schoolids: [] }>) {
    const schoolIds = job.data.schoolids;
    const themes = await this._prismaService.theme.findMany({});
    for (const schoolId of schoolIds) {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      try {
        const school = await this._prismaService.school.update({
          where: {
            giga_school_id: schoolId,
          },
          data: {
            themeId: randomTheme.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  @Process(RESERVE_NFT)
  public async reserveNft(
    job: Job<{ giga_school_id: string; email: string; schoolId: string; walletAddress?: string }>,
  ) {
    const schoolId = job.data.schoolId;
    const email = job.data.email;
    const giga_school_id = job.data.giga_school_id;
    try {
      const tx = await reserveNft(giga_school_id, email);
      const txReceipt = await tx.wait();

      if (txReceipt.status === 1) {
        this.contributorService.addContributor({
          email: job.data.email,
          walletAddress: job.data.walletAddress,
          schoolReserved: schoolId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

@Injectable()
@Processor(IMAGE_QUEUE)
export class ImageProcessor {
  private readonly _logger = new Logger(ContributeProcessor.name);
  constructor(
    private readonly _configService: ConfigService,
    private readonly _mailerService: MailerService,
    private readonly _prismaService: PrismaAppService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing image ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed image ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed({ name: SET_IMAGE_PROCESS })
  public async onImageFail(job: Job<any>, error: any) {
    this._logger.error(`Failed image ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: `Failed to update NFT image. NFT minted successfully. error: ${error.message}, jobId: ${job.id}`,
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process({ name: SET_IMAGE_PROCESS, concurrency: 1 })
  public async processImages(job: Job<any>) {
    const id = job.data.id;
    this._logger.log(`Updating image of school: ${id}`);

    try {
      const scriptData = await getScriptData(
        this._configService.get<string>('GIGA_NFT_CONTENT_ADDRESS'),
        this._configService.get<string>('GIGA_IMAGE_CONTENT_ADDRESS'),
        id,
      );

      const artScript = await getArtScript(
        'NFTContent',
        this._configService.get<string>('GIGA_NFT_CONTENT_ADDRESS'),
      );
      const base64Image = await generateP5Image(`${artScript}`, scriptData);
      const decodedImage = await decodeBase64Image(base64Image);

      if (decodedImage) {
        const uploadResult = await uploadFile(decodedImage.data);
        await updateImageHash(
          'NFTContent',
          this._configService.get<string>('GIGA_NFT_CONTENT_ADDRESS'),
          uploadResult,
          id,
        );
        await this._prismaService.school.update({
          where: { giga_school_id: id },
          data: { imageHash: uploadResult },
        });
      } else {
        throw new Error('Failed to decode base64 image.');
      }
    } catch (error) {
      this._logger.error(`Error updating image: ${error}`);
      // Crucially, re-throw the error to signal job failure to BullMQ
      throw error;
    }
  }
}

@Injectable()
@Processor(CONTRIBUTE_QUEUE)
export class ContributeProcessor {
  private readonly _logger = new Logger(ContributeProcessor.name);
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private contributeDataService: ContributeDataService,
    private schoolService: SchoolService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public async onErrorDB(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: 'Something went wrong while updating database!!',
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process(SET_CONTRIBUTE_QUEUE)
  public async contributeUpdate(job: Job<{ ids: any; userId: string }>) {
    const idsArray = job.data.ids.contributions;
    const userId = job.data.userId;
    for (const data of idsArray) {
      const transactions = await this.contributeDataService.validate(
        data.contributionId,
        Boolean(data.isValid),
        userId,
      );
    }
  }
  @Process(SET_APPROVE_QUEUE)
  public async approveUpdate(job: Job<{ id: string; userId: string }>) {
    const id = job.data.id;
    const userId = job.data.userId;
    return this.schoolService.update(id, userId);
  }
}

@Injectable()
@Processor(UPLOAD_QUEUE)
export class UpdateProcessor {
  private readonly _logger = new Logger(ContributeProcessor.name);
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private contributeDataService: ContributeDataService,
    private schoolService: SchoolService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public async onErrorDB(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: 'Something went wrong while updating database!!',
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process(SET_UPLOAD_PROCESS)
  public async contributeUpdate(job: Job<{ ids: any; userId: string }>) {
    const idsArray = job.data.ids.contributions;
    const userId = job.data.userId;
    for (const data of idsArray) {
      const transactions = await this.contributeDataService.validate(
        data.contributionId,
        Boolean(data.isValid),
        userId,
      );
    }
  }
}

@Injectable()
@Processor(VC_QUEUE)
export class VCProcessor {
  private readonly _logger = new Logger(VCProcessor.name);
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private prismaService: PrismaAppService,
    private readonly mailService: MailService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed({ name: UPDATE_CIW || SET_PROCESS_VC })
  public async onErrorDB(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: `Something went wrong while updating database!! ${job.data.did}, error: ${error.message}`,
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process(UPDATE_CIW)
  public async updateCiw(job: Job<{ did: string }>) {
    const id = job.data.did;
    try {
      await this.prismaService.informationWorker.update({
        where: { did: id },
        data: { emailSent: true },
      });
    } catch (error) {
      this._logger.error(`Error updating CIW: ${error}`);
    }
  }

  @Process(SET_PROCESS_VC)
  public async hanldeProcessVC(job: Job<{ vcDetails: any }>) {
    try {
      this._logger.log(`Processing VC`);
      const vcDetails = job.data.vcDetails;
      const universalLink = vcDetails.universalLink;
      const did = vcDetails.credentialSubject.id;
      const CIWDetails = await this.prismaService.informationWorker.findUnique({
        where: {
          did: did,
          emailSent: false,
        },
      });
      if (CIWDetails)
        this.mailService.sendVCLink({
          email: CIWDetails.email,
          link: universalLink,
          did: did,
        });
      else {
        this._logger.error(`No CIW Found to send VC link to CIW`);
      }
    } catch (error) {
      this._logger.error(`Error processing VC: ${error}`);
      throw error;
    }
  }
}
