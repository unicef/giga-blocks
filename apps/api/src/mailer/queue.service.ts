import { Injectable, Logger } from '@nestjs/common';
import {
  CONTRIBUTE_QUEUE,
  MINT_QUEUE,
  ONCHAIN_DATA_QUEUE,
  SET_APPROVE_QUEUE,
  SET_CONTRIBUTE_QUEUE,
  SET_IMAGE_PROCESS,
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
import { SchoolData } from '../schools/dto/mint-queue.dto';
import {
  ApproveContributeDatumDto,
  UpdateContributeDatumDto,
} from 'src/contribute/dto/update-contribute-datum.dto';

@Injectable()
export class QueueService {
  private readonly _logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue(ONCHAIN_DATA_QUEUE) private readonly _onchainQueue: Queue,
    @InjectQueue(MINT_QUEUE) private readonly _mintQueue: Queue,
    @InjectQueue(CONTRIBUTE_QUEUE) private readonly _contributeQueue: Queue,
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

  private async updateSchools(ids: string[]) {
    const schools = await this._prismaService.school.updateMany({
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
      throw new Error(`No. of schools updated in database is not equal to no of schools minted`);
    }
  }

  private schoolToArrayMapper(school: SchoolData) {
    return [
      school.schoolName,
      school.schoolType,
      school.country,
      school.longitude.toString(),
      school.latitude.toString(),
      school.connectivity.toString(),
      school.coverage_availabitlity.toString(),
      school.electricity_availabilty.toString(),
    ];
  }

  public async sendMintNFT(MintData: MintQueueDto) {
    try {
      const mintData = MintData.data.map(school => this.schoolToArrayMapper(school));
      let ids: string[];
      let giga_ids: string[];
      let schools;
      const batchSize = this._configService.get<number>('BATCH_SIZE');
      if (mintData.length <= batchSize) {
        ids = MintData.data.map(school => school.id);
        giga_ids = MintData.data.map(school => school.giga_school_id);
        schools = await this.updateSchools(ids);
        await this._mintQueue.add(SET_MINT_NFT, { mintData, ids, giga_ids }, jobOptions);
      } else {
        let mintDatum;
        for (let i = 0; i < mintData.length; i += batchSize) {
          mintDatum = mintData.slice(i, i + batchSize);
          ids = MintData.data.slice(i, i + batchSize).map(school => school.id);
          schools = await this.updateSchools(ids);
          await this._mintQueue.add(
            SET_MINT_NFT,
            { mintData: mintDatum, ids, giga_ids },
            jobOptions,
          );
        }
      }
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing bulk transaction to blockchain `);
      console.log(error)
      throw error;
    }
  }

  public async sendSingleMintNFT(MintData: MintQueueSingleDto) {
    try {
      const mintData = this.schoolToArrayMapper(MintData.data);
      const ids = [MintData.data.id];
      const giga_id = MintData.data.giga_school_id;
      await this.updateSchools(ids);
      await this._mintQueue.add(SET_MINT_SINGLE_NFT, { mintData, ids, giga_id }, jobOptions);
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing transaction to blockchain `);
      throw error;
    }
  }

  public async processImage(id: string) {
    try {
      await this._mintQueue.add(SET_IMAGE_PROCESS, { id }, jobOptions);
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing transaction to blockchain `);
      throw error;
    }
  }

  public async contributeData(ids: UpdateContributeDatumDto, userId: string) {
    try {
      await this._contributeQueue.add(SET_CONTRIBUTE_QUEUE, { ids, userId }, jobOptions);
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing `);
      throw error;
    }
  }

  public async approveBulkData(ids: ApproveContributeDatumDto, userId: string) {
    try {
      const { id } = ids;
      for (let i = 0; i < id.length; i++) {
        const schoolid = id[i];
        await this._contributeQueue.add(SET_APPROVE_QUEUE, { id: schoolid, userId }, jobOptions);
      }
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing `);
      throw error;
    }
  }
}
