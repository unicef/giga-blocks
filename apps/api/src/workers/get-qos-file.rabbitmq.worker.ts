import { Global, Inject, Injectable } from '@nestjs/common';
import {
  BaseWorker,
  getQueueByName,
  QueueUtilsService,
  RabbitMQModuleOptions,
} from '@rumsan/rabbitmq';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { AMQP_CONNECTION, QUEUES } from 'src/constants';
import { SchoolService } from 'src/schools/schools.service';
import { getFileData } from 'src/utils/arweave/get';
@Global()
@Injectable()
export class QOSDataFetchWorker extends BaseWorker<SchoolService> {
  private channelWrapper: ChannelWrapper;
  constructor(
    @Inject(AMQP_CONNECTION) private readonly connection: AmqpConnectionManager,
    queueUtilsService: QueueUtilsService,
    @Inject('QUEUE_NAMES')
    private readonly queuesToSetup: RabbitMQModuleOptions['queues'],
  ) {
    const queue = getQueueByName(queuesToSetup, QUEUES.QOS_FETCH_QUEUE);

    super(
      queueUtilsService,
      QUEUES.QOS_FETCH_QUEUE,
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

  protected async processItem(batch): Promise<any> {
    console.log(batch);
    console.log("reached")
    return await getFileData('PpyQUuu2-_rktYAPnlv22A9AMmXPnsy6baA-GJbhf20')
     
  }

}
