import { Global, Inject, Injectable } from '@nestjs/common';
import {
  BaseWorker,
  getQueueByName,
  PRISMA_SERVICE,
  QueueUtilsService,
  RabbitMQModuleOptions,
} from '@rumsan/rabbitmq';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { AMQP_CONNECTION, QUEUES } from 'src/constants';
import { NFTContent, QOSGiga } from 'src/constants/contract';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/schools/schools.service';
import { store } from 'src/utils/arweave/store';
import { getContractWithSigner } from 'src/utils/ethers/contractWithSigner';
import { addArweaveHash, updateBulkData } from 'src/utils/ethers/transactionFunctions';
@Global()
@Injectable()
export class QOSDataWorker extends BaseWorker<SchoolService> {
  private channelWrapper: ChannelWrapper;
  constructor(
    @Inject(AMQP_CONNECTION) private readonly connection: AmqpConnectionManager,
    queueUtilsService: QueueUtilsService,
    @Inject('QUEUE_NAMES')
    private readonly queuesToSetup: RabbitMQModuleOptions['queues'],
  ) {
    const queue = getQueueByName(queuesToSetup, QUEUES.QOS_QUEUE);

    super(
      queueUtilsService,
      QUEUES.QOS_QUEUE,
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
      this.logger.error('Error initializing QOS Worker:', err);
    }
  }

  protected async processItem(batch): Promise<void> {
    const hashes = await Promise.all(batch.map(async (b) => {
        return store(b.data);
    }));
    const QOSGigaAddress = process.env.NEXT_PUBLIC_GIGA_QOS_ADDRESS as string;

    await addArweaveHash(QOSGiga, QOSGigaAddress, hashes)
  }

}
