import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MINT_QUEUE, ONCHAIN_DATA_QUEUE, SET_MINT_NFT, SET_ONCHAIN_DATA } from '../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

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

  @Process(SET_ONCHAIN_DATA)
  public async sendOnchainData(job: Job<{ h: number }>) {
    this._logger.log(`Sending transaction to blockchain`);

    try {
      //transaction to blockchain
      setTimeout(() => {
        this._logger.log(`Transaction completed HAHAHA ${job.data.h}`);
      }, 10000);
      throw new Error('Error attempt again');
    } catch {
      this._logger.error(`Failed to send transactions to blockchain`);
    }
    throw new Error('Error what to do');
  }
}

@Injectable()
@Processor(MINT_QUEUE)
export class MintQueueProcessor {
  private readonly _logger = new Logger(MintQueueProcessor.name);

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
    try {
      this.sendMintNFT(job);
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

  @Process(SET_MINT_NFT)
  public async sendMintNFT(job: Job<{ h: number }>) {
    this._logger.log(`Sending mint nft to blockchain`);

    try {
      //transaction to blockchain
      setTimeout(() => {
        this._logger.log(`Mint nft completed ${job.data.h}`);
      }, 10000);
    } catch {
      this._logger.error(`Failed to send mint nft to blockchain`);
    }
  }
}
