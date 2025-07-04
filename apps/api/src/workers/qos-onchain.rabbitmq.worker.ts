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

  private toUTC(date: Date | string): Date {
    const d = new Date(date);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  }

  protected async processItem(batch): Promise<void> {
    this.workerLogger.log(`Received batch of ${batch.length} items for processing QOS Data.`);

    batch.map(async (d: any) => {
      const qosDate = new Date(d.date);
      const formattedDate = qosDate.toISOString().split('T')[0];
      const QOSGigaAddress = process.env.GIGA_QOS_CONTRACT_ADDRESS as string;
      const hashes = await this.getArweaveHashes(qosDate, d.country_id);
      const tx = await addArweaveHash(QOSGiga, QOSGigaAddress, hashes, formattedDate);
      const txStatus = await tx.wait();
      this.workerLogger.log(
        `Transaction hash: ${tx.hash} for date: ${qosDate} and country_id: ${d.country_id}`,
      );
      if (txStatus.status === 1) {
        await this.updateOnChainStatus(hashes);
      }
    });
  }

  private async getArweaveHashes(qosDate: Date, country_id: string): Promise<string[]> {
    const formattedDate = this.toUTC(new Date(qosDate));
    const qosData = await this.prisma.qos.findMany({
      where: { date: formattedDate, country_iso3_code: country_id, arewaveUploaded: false },
      select: {
        download_speed: true,
        upload_speed: true,
        latency: true,
        date: true,
        country_iso3_code: true,
        data_source: true,
        giga_school_id: true,
      },
    });
    if (!qosData || qosData.length === 0) {
      this.workerLogger.warn(`No QOS data found for date: ${formattedDate}`);
      return [];
    }

    let hashes: string[];

    // const dbHashes = await this.prisma.arweaveHash.findUnique({ where: { date: qosDate } });

    // if (dbHashes) return dbHashes.arweaveHash as string[];  ----????

    hashes = [
      await store({
        date: qosDate,
        data: qosData,
      }),
    ];
    const createdRows = hashes.map(hash => ({
      arweaveHash: hash,
      date: qosDate,
      country_id: country_id,
    }));

    const txn = await this.prisma.$transaction(async prisma => {
      await prisma.arweaveHash.createMany({
        data: createdRows,
      });
      await prisma.qos.updateMany({
        where: {
          date: formattedDate,
          country_iso3_code: country_id,
        },
        data: {
          arewaveUploaded: true, // Mark the QOS data as uploaded
        },
      });
    });
    return hashes;
  }

  async updateOnChainStatus(hashes: string[]): Promise<void> {
    try {
      await this.prisma.arweaveHash.updateMany({
        where: {
          arweaveHash: {
            in: hashes, 
          },
        },
        data: {
          onChainUpdated: true,
        },
      });
      this.workerLogger.log(`Updated onChain status for hash: ${hashes}`);
    } catch (error) {
      this.workerLogger.error(`Error updating onChain status for hash ${hashes}:`, error);
    }
  }
}
