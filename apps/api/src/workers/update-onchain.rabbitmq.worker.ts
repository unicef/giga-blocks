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
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/schools/schools.service';
@Global()
@Injectable()
export class UpdateOnchainWorker extends BaseWorker<SchoolService> {
  private channelWrapper: ChannelWrapper;
  constructor(
    @Inject(AMQP_CONNECTION) private readonly connection: AmqpConnectionManager,
    queueUtilsService: QueueUtilsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaAppService,
    @Inject('QUEUE_NAMES') private readonly queuesToSetup: RabbitMQModuleOptions['queues'],
    private readonly schoolService: SchoolService
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
    console.log(batch)

    try {
      //Pause a worker for 10 seconds
      // await new Promise((resolve) => setTimeout(resolve, 1000));
   
    } catch (error) {
      throw error;
    }
  }
}
