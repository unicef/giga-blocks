import { Injectable, Logger } from '@nestjs/common';
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
  SET_MINT_NFT,
  SET_MINT_SINGLE_NFT,
  SET_ONCHAIN_DATA,
  CONTRIBUTE_QUEUE,
  SET_APPROVE_QUEUE,
  SET_CONTRIBUTE_QUEUE,
} from '../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { mintNFT, mintSingleNFT } from 'src/utils/ethers/transactionFunctions';
import { MintQueueSingleDto } from 'src/schools/dto/mint-queue.dto';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolData } from '../types/mintdata.types';
import { MintStatus } from '@prisma/application';
import { jobOptions } from '../config/bullOptions';
import { ContributeDataService } from 'src/contribute/contribute.service';
import { SchoolService } from 'src/schools/schools.service';

@Injectable()
@Processor(ONCHAIN_DATA_QUEUE)
export class QueueProcessor {
  private readonly _logger = new Logger(QueueProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
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
  public onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        //this.sendOnchainData(job);
        return this._mailerService.sendMail({
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: 'Something went wrong with transactions!! ',
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
}

@Injectable()
@Processor(MINT_QUEUE)
export class MintQueueProcessor {
  private readonly _logger = new Logger(MintQueueProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private readonly _prismaService: PrismaAppService,
    @InjectQueue(MINT_QUEUE) private readonly _mintQueue: Queue,
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
      //dbupdate in case of job fail
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
          subject: 'Something went wrong with transactions while minting!!',
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
          subject: 'Something went wrong while updating database!!',
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process(SET_DBUPDATE_QUEUE)
  public async sendDBUpdate(job: Job<{ status: MintStatus; ids: string[] }>) {
    this._logger.log(`Updating database`);
    const schools = await this._prismaService.school.updateMany({
      where: {
        id: {
          in: job.data.ids,
        },
      },
      data: {
        minted: job.data.status,
      },
    });
    if (schools.count !== job.data.ids.length) {
      throw new Error(`No. of schools updated in database is not equal to no of schools minted`);
    }
  }

  @Process(SET_MINT_NFT)
  public async sendMintNFT(job: Job<{ address: string; mintData: SchoolData[]; ids: string[] }>) {
    this._logger.log(`Sending mint nft to blockchain`);

    let status = true;
    const tx = await mintNFT(
      'NFT',
      this._configService.get<string>('GIGA_NFT_CONTRACT_ADDRESS'),
      job.data.mintData,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
      status = false;
    }
    return this.statusCheckandDBUpdate(status, job.data.ids);
  }

  @Process(SET_MINT_SINGLE_NFT)
  public async sendSingleMintNFT(
    job: Job<{ address: string; mintData: SchoolData; ids: string[] }>,
  ) {
    this._logger.log(`Sending single mint nft to blockchain`);
    let status = true;
    const tx = await mintSingleNFT(
      'NFT',
      this._configService.get<string>('GIGA_NFT_CONTRACT_ADDRESS'),
      job.data.mintData,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
      status = false;
    }
    return this.statusCheckandDBUpdate(status, job.data.ids);
  }

  private async statusCheckandDBUpdate(status: boolean, ids: string[]) {
    if (status) {
      this._logger.log(`NFTs minted successfully`);
      try {
        await this._mintQueue.add(
          SET_DBUPDATE_QUEUE,
          { ids: ids, status: status ? MintStatus.MINTED : MintStatus.NOTMINTED },
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
      const transactions = this.contributeDataService.validate(
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
