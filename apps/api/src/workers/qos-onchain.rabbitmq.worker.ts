import { Global, Inject, Injectable, Logger } from '@nestjs/common';
import {
  BaseWorker,
  getQueueByName,
  PRISMA_SERVICE,
  QueueUtilsService,
  RabbitMQModuleOptions,
} from '@rumsan/rabbitmq';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { AMQP_CONNECTION, QUEUES } from 'src/constants';
import { QOSGiga } from 'src/constants/contract';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SchoolService } from 'src/schools/schools.service';
import { store } from 'src/utils/arweave/store';
import { addArweaveHash } from 'src/utils/ethers/transactionFunctions';

@Global()
@Injectable()
export class QOSDataWorker extends BaseWorker<SchoolService> {
  private channelWrapper: ChannelWrapper;
  private readonly workerLogger = new Logger(QOSDataWorker.name);

  constructor(
    @Inject(AMQP_CONNECTION) private readonly connection: AmqpConnectionManager,
    queueUtilsService: QueueUtilsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaAppService,
    @Inject('QUEUE_NAMES') private readonly queuesToSetup: RabbitMQModuleOptions['queues'],
  ) {
    const queue = getQueueByName(queuesToSetup, QUEUES.QOS_QUEUE);

    super(queueUtilsService, QUEUES.QOS_QUEUE, 10, 'batch', connection, queue?.options?.arguments);
  }

  async onModuleInit() {
    try {
      this.workerLogger.log(`Initializing QOSDataWorker for queue: ${QUEUES.QOS_QUEUE}`);

      this.channelWrapper = this.connection.createChannel({
        json: true,
        setup: async channel => {
          await this.initializeWorker(channel);
        },
      });
    } catch (err) {
      this.logger.error('Error initializing QOS Worker:', err);
    }
  }

  protected async processItem(batch): Promise<void> {
    this.workerLogger.log(`Received batch of ${batch.length} items for processing QOS Data.`);

    batch.map(async (d: any) => {
      const qosDate = new Date(d.date);
      const QOSGigaAddress = process.env.GIGA_QOS_CONTRACT_ADDRESS as string;
      await addArweaveHash(QOSGiga, QOSGigaAddress, await this.getArweaveHashes(qosDate));
    });
  }

  private async getArweaveHashes(qosDate: Date): Promise<string[]> {
    const qosData = await this.prisma.qos.findMany({ where: { date: qosDate } });

    let hashes: string[];

    const dbHashes = await this.prisma.arweaveHash.findUnique({ where: { date: qosDate } });

    if (dbHashes) return dbHashes.arweaveHash as string[];

    hashes = [
      await store({
        date: qosDate,
        data: qosData,
      }),
    ];

    await this.prisma.arweaveHash.create({
      data: {
        arweaveHash: hashes,
        date: qosDate,
      },
    });

    return hashes;
  }
}
