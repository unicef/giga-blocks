import { Injectable, Logger } from '@nestjs/common';
import {
  CLAIM_NFT,
  CONTRIBUTE_QUEUE,
  IMAGE_QUEUE,
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
    @InjectQueue(IMAGE_QUEUE) private readonly _imageQueue: Queue,
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
      school.region_name,
    ];
  }

  public async sendMintNFT(MintData: MintQueueDto) {
    try {
      const mintData = MintData.data.map(school => this.schoolToArrayMapper(school));
      let ids: string[];
      let giga_ids: string[];
      let schools;
      const batchSize = Number(this._configService.get<number>('BATCH_SIZE'));
      if (mintData.length <= batchSize) {
        ids = MintData.data.map(school => school.id);
        giga_ids = MintData.data.map(school => school.giga_school_id);
        schools = await this.updateSchools(ids);
        this._logger.log(mintData.length, 'is mint data with batch size', batchSize);
         await this._mintQueue.add(SET_MINT_NFT, { mintData, ids, giga_ids }, jobOptions);
      } else {
        let mintDatum;
        for (let i = 0; i < mintData.length; i += batchSize) {
          const mintDatum = mintData.slice(i, i + batchSize); 
          const ids = MintData.data.slice(i, i + batchSize).map((school) => school.id); 
          const giga_ids = MintData.data.slice(i, i + batchSize).map((school) => school.giga_school_id); 
          this._logger.log("inside batch processing", ids.length)
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
      console.log(error);
      throw error;
    }
  }

  public async sendSingleMintNFT(MintData: MintQueueSingleDto) {
    try {
      const mintData = this.schoolToArrayMapper(MintData.data);
      const id = MintData.data.id;
      const giga_id = MintData.data.giga_school_id;
      await this.updateSchools([id]);
      await this._mintQueue.add(
        SET_MINT_SINGLE_NFT,
        {
          mintData,
          id,
          giga_id,
          email: MintData.email,
          walletAddress: MintData.walletAddress,
          themeId: MintData.themeId,
        },
        jobOptions,
      );
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing transaction to blockchain `);
      throw error;
    }
  }

  public async processImage(id: string) {
    try {
      await this._imageQueue.add(SET_IMAGE_PROCESS, { id }, jobOptions);
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      console.log('error', error);
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

  public async csvMintdata(batchId: string){
    this._logger.log(batchId, "is batch id")
    try {
        const schools = await this._prismaService.school.findMany({
          where: {
            uploadId: batchId,
          },
        });
  
        const schoolData: SchoolData[] = schools.map((school) => {
          return {
            id: school.id,
            giga_school_id: school.giga_school_id,
            schoolName: school.name,
            schoolType: school.school_type,
            country: school.country,
            latitude: school.latitude,
            longitude: school.longitude,
            connectivity: school.connectivity.toString(),
            electricity_availabilty: school.electricity_available,
            coverage_availabitlity: school.coverage_availability.toString(),
            region_name: school.region_name,
          };
        });

  
        if (schoolData.length === 0) {
          this._logger.warn(`No schools found for batch ${batchId}`);
          return;
        }
  
        this.sendMintNFT({ data: schoolData }).catch((error) => {
        this._logger.error(`Error in csvMintdata for batch ${batchId}:`, error);
      })
    

    }
    catch(error){
      this._logger.error(`Error queueing `);
      throw error;
    }
  }

  public async claimReservedNFT(email: string, walletAddress: string) {
    try {
      await this._onchainQueue.add(CLAIM_NFT, { email, walletAddress }, jobOptions);
      return { message: 'queue added successfully', statusCode: 200 };
    } catch (error) {
      this._logger.error(`Error queueing transaction to blockchain `);
      throw error;
    }
  }
}
