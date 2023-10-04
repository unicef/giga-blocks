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
} from '../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { mintNFT, mintSingleNFT } from 'src/utils/ethers/transactionFunctions';
import { MintQueueSingleDto } from 'src/schools/dto/mint-queue.dto';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolData } from '../types/mintdata.types';
import { MintStatus } from '@prisma/application';
import { jobOptions } from '../config/bullOptions';

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

  @OnQueueFailed({ name: SET_MINT_NFT })
  public async onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
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
  public async sendDBUpdate(job: Job<{ ids: string[] }>) {
    this._logger.log(`Updating database`);
    const schools = await this._prismaService.school.updateMany({
      where: {
        id: {
          in: job.data.ids,
        },
      },
      data: {
        minted: MintStatus.MINTED,
      },
    });
    if (schools.count !== job.data.ids.length) {
      throw new Error(`No. of schools updated in database is not equal to no of schools minted`);
    }
  }

  @Process(SET_MINT_NFT)
  public async sendMintNFT(job: Job<{ address: string; mintData: SchoolData[]; ids: string[] }>) {
    this._logger.log(`Sending mint nft to blockchain`);
    await this._prismaService.school.updateMany({
      where: {
        id: {
          in: job.data.ids,
        },
      },
      data: {
        minted: MintStatus.ISMINTING,
      },
    });

    let status: boolean = true;
    const tx = await mintNFT(
      'NFT',
      this._configService.get<string>('GIGA_NFT_CONTRACT_ADDRESS'),
      job.data.mintData,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
      status = false;
    }

    if (status) {
      this._logger.log(`NFTs minted successfully`);
      try {
        await this._mintQueue.add(SET_DBUPDATE_QUEUE, { ids: job.data.ids }, jobOptions);
      } catch (error) {
        this._logger.error(`Error queueing database update: ${error}`);
      }
    } else {
      this._logger.error(`NFTs minted transaction failed`);
      throw new Error('NFTs minted transaction failed');
    }
  }

  @Process(SET_MINT_SINGLE_NFT)
  public async sendSingleMintNFT(job: Job<{ address: string; MintData: MintQueueSingleDto }>) {
    this._logger.log(`Sending single mint nft to blockchain`);
    const school = job.data.MintData.data;
    const mintData = [
      school.schoolName,
      school.country,
      school.latitude,
      school.longitude,
      school.connectivity,
      school.coverage_availabitlity,
    ];
    const id = school.id;
    let status: boolean = true;
    this._logger.log(`Minting NFTs`);
    const tx = await mintSingleNFT(
      'NFT',
      this._configService.get<string>('GIGA_NFT_CONTRACT_ADDRESS'),
      mintData,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
      status = false;
    }

    if (status) {
      this._logger.log(`NFTs minted successfully`);
      try {
        const schools = await this._prismaService.school.updateMany({
          where: {
            id,
          },
          data: {
            minted: MintStatus.MINTED,
          },
        });
      } catch (error) {
        this._logger.error(`Error updating minted status in database: ${error}`);
      }
    } else {
      this._logger.error(`NFT minted transaction failed`);
      throw new Error('NFT minted transaction failed');
    }
  }
}
