import { Injectable, Logger } from '@nestjs/common';
import { MINT_QUEUE, ONCHAIN_DATA_QUEUE, SET_MINT_NFT, SET_ONCHAIN_DATA } from './constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { jobOptions } from './config/bullOptions';

@Injectable()
export class QueueService {
  private readonly _logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue(ONCHAIN_DATA_QUEUE) private readonly _onchainQueue: Queue,
    @InjectQueue(MINT_QUEUE) private readonly _mintQueue: Queue,
  ) {}

  public async sendTransaction(data: number): Promise<void> {
    try {
      await this._onchainQueue.add(SET_ONCHAIN_DATA, { h: data }, jobOptions);
    } catch (error) {
      this._logger.error(`Error queueing bulk transaction to blockchain `);
      throw error;
    }
  }

  public async sendMintNFT(batch: number, address: string): Promise<void> {
    try {
      await this._mintQueue.add(SET_MINT_NFT, { batch, address }, jobOptions);
    } catch (error) {
      this._logger.error(`Error queueing bulk transaction to blockchain `);
      throw error;
    }
  }
}
