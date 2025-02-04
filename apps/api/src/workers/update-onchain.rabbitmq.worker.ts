import { Global, Inject, Injectable } from '@nestjs/common';
import {
  BaseWorker,
  getQueueByName,
  PRISMA_SERVICE,
  QueueUtilsService,
  RabbitMQModuleOptions,
} from '@rumsan/rabbitmq';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { AMQP_CONNECTION, UPDATE_ONCHAIN } from 'src/constants';
import { NFTContent } from 'src/constants/contract';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/schools/schools.service';
import { getContractWithSigner } from 'src/utils/ethers/contractWithSigner';
import { updateBulkData } from 'src/utils/ethers/transactionFunctions';
@Global()
@Injectable()
export class UpdateOnchainDataWorker extends BaseWorker<SchoolService> {
  private channelWrapper: ChannelWrapper;
  constructor(
    @Inject(AMQP_CONNECTION) private readonly connection: AmqpConnectionManager,
    queueUtilsService: QueueUtilsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaAppService,
    @Inject('QUEUE_NAMES')
    private readonly queuesToSetup: RabbitMQModuleOptions['queues'],
  ) {
    const queue = getQueueByName(queuesToSetup, UPDATE_ONCHAIN);

    super(
      queueUtilsService,
      UPDATE_ONCHAIN,
      10,
      'batch',
      connection,
      queue?.options?.arguments
    );
  }

  async onModuleInit() {
    try {
      this.channelWrapper = this.connection.createChannel({
        json: true,
        setup: async (channel) => {
          await this.initializeWorker(channel);
        },
      });
    } catch (err) {
      this.logger.error('Error initializing Beneficiary Worker:', err);
    }
  }

  protected async processItem(batch): Promise<void> {
    console.log(batch[0].school_ids)
    try {
      batch[0].school_ids.map(async (b) => {
        const schoolData = await this.prisma.school.findMany({
          where: {
          giga_school_id: 
          {
            in: b.data
          }
          }, select: {
            giga_school_id: true,
            name: true, 
            school_type: true,
            country: true,
            longitude: true,
            latitude: true,
            connectivity: true,
            coverage_availability: true,
            electricity_available: true,
            region_name: true
          }})
  
        const valuesArray = schoolData.map((school) => Object.values(school))
        updateBulkData(NFTContent, process.env.GIGA_NFT_CONTENT_ADDRESS, b.data, valuesArray)
      })
      
      //Pause a worker for 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      throw error;
    }
  }

}
