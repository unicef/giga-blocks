import { Injectable, Logger } from '@nestjs/common';
import {
  MINT_QUEUE,
  ONCHAIN_DATA_QUEUE,
  SET_MINT_NFT,
  SET_MINT_SINGLE_NFT,
  SET_ONCHAIN_DATA,
} from './constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { jobOptions } from './config/bullOptions';
import { MintQueueDto, MintQueueSingleDto } from 'src/schools/dto/mint-queue.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { MintStatus } from '@prisma/application';

@Injectable()
export class QueueService {
  private readonly _logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue(ONCHAIN_DATA_QUEUE) private readonly _onchainQueue: Queue,
    @InjectQueue(MINT_QUEUE) private readonly _mintQueue: Queue,
    private readonly _configService: ConfigService,
    private readonly _prismaService: PrismaAppService,
  ) {}

  public async sendTransaction(data: number): Promise<void> {
    try {
      await this._onchainQueue.add(SET_ONCHAIN_DATA, { h: data }, jobOptions);
    } catch (error) {
      this._logger.error(`Error queueing bulk transaction to blockchain `);
      throw error;
    }
  }

  public async sendMintNFT(batch: number, address: string, MintData: MintQueueDto) {
    try {
      const mintData = MintData.data.map(school => [
        school.schoolName,
        school.country,
        school.latitude,
        school.longitude,
        school.connectivity,
        school.coverage_availabitlity,
      ]);
      let ids: string[];
      let schools;
      const batchSize = this._configService.get<number>('BATCH_SIZE');
      if (mintData.length <= batchSize) {
        ids = MintData.data.map(school => school.id);
        schools = await this._prismaService.school.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            minted: MintStatus.ISMINTING,
          },
        });
        if (schools.count !== ids.length) {
          throw new Error(
            `No. of schools updated in database is not equal to no of schools minted`,
          );
        }
        await this._mintQueue.add(SET_MINT_NFT, { address, mintData, ids }, jobOptions);
      } else {
        for (let i = 0; i < mintData.length; i += batchSize) {
          let mintDatum = mintData.slice(i, i + batchSize);
          ids = MintData.data.slice(i, i + batchSize).map(school => school.id);
          schools = await this._prismaService.school.updateMany({
            where: {
              id: {
                in: ids,
              },
            },
            data: {
              minted: MintStatus.ISMINTING,
            },
          });
          if (schools.count !== ids.length) {
            throw new Error(
              `No. of schools updated in database is not equal to no of schools minted`,
            );
          }
          await this._mintQueue.add(
            SET_MINT_NFT,
            { address, mintData: mintDatum, ids },
            jobOptions,
          );
        }
      }
    } catch (error) {
      this._logger.error(`Error queueing bulk transaction to blockchain `);
      throw error;
    }
  }

  public async sendSingleMintNFT(
    batch: number,
    address: string,
    MintData: MintQueueSingleDto,
  ): Promise<void> {
    try {
      await this._mintQueue.add(SET_MINT_SINGLE_NFT, { address, MintData }, jobOptions);
    } catch (error) {
      this._logger.error(`Error queueing transaction to blockchain `);
      throw error;
    }
  }
}
