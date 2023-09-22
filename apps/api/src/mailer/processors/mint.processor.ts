import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MINT_NFT, MINT_QUEUE } from '../constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Processor(MINT_QUEUE)
export class MintProcessor {
  private readonly _logger = new Logger(MintProcessor.name);

  constructor(private readonly _configService: ConfigService) {}

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
    // try{
    //     return this._mailerService.sendMail({
    //         to: this._configService.get('EMAIL_ADDRESS'),
    //         from: this._configService.get('EMAIL_ADDRESS'),
    //         subject: 'Something went wrong with server!!',
    //         template: './error',
    //         context: {},
    //     });
    // } catch{
    //     this._logger.error('Failed to send confirmation email to admin');
    // }
  }
  @Process(MINT_NFT)
  public async mintNFT(job: Job<{ batch: number }>) {
    this._logger.log(`Minting NFT for batch '${job.data.batch}'`);
    try {
    } catch (err) {
      this._logger.error(`Failed to mint NFT for batch '${job.data.batch}'`);
      this.add(MINT_NFT, { batch: job.data.batch }, { attempts: 3 });
    }
  }
}
