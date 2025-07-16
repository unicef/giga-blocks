import express, { Request, Response } from 'express';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import {
  addAlchemyContextToRequest,
  AlchemyWebhookEvent,
  validateAlchemySignature,
} from './utils/index';

async function main(): Promise<void> {
  const app = express();
  const port = process.env.WEBHOOK_PORT || 3010;
  const alchemySigningKey = process.env.ALCHEMY_SIGNING_KEY || '';

  if (!alchemySigningKey) {
    console.error('ALCHEMY_SIGNING_KEY is not set. Exiting...');
    process.exit(1);
  }

 app.get('/webhook/health', (req: any, res: any) => {
  return res.status(200).send({ status: 'ok' });
});


  app.use(express.json({ verify: addAlchemyContextToRequest }));
  // app.use(express.urlencoded({ extended: true }));
  app.use(validateAlchemySignature(alchemySigningKey));

  const connection = new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  });

  const webHookQueue = new Queue('ONCHAIN_DATA_QUEUE', {
    connection: connection,
    defaultJobOptions: {
      removeOnComplete: false,
      removeOnFail: false,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      delay:6000
    },
  });

  const addTaskToQueue = async (transactionDetails: any): Promise<void> => {
    try {
      await webHookQueue.add('PROCESS_SUCCESS_TXN',{transactionDetails}, {});
    } catch (error) {
      console.error('Error adding task to queue:', error);
    }
  };

  app.post('/webhook', (req: any, res: any) => {
    const webhookEvent = req.body as AlchemyWebhookEvent;
    if (webhookEvent.webhookId) {
      console.log('Webhook ID:', webhookEvent.webhookId);
    }
    if (webhookEvent.event && webhookEvent.event.data) {
      console.log('Event Data:', webhookEvent.event.data);
      if (
        webhookEvent.event.data.block &&
        webhookEvent.event.data.block.number
      ) {
        console.log('Block Number:', webhookEvent.event.data.block.number);
      }
      if (
        webhookEvent.event.data.logs &&
        webhookEvent.event.data.logs.length > 0
      ) {
        console.log(
          'First Log Topics:',
          webhookEvent.event.data.logs[0].topics
        );
        console.log("Status",
          webhookEvent.event.data.block.logs[0].transaction.status)
      }

      const transactionDetails = {
        transactionHash: webhookEvent.event.data.block.logs[0].transaction.hash,
        status: webhookEvent.event.data.block.logs[0].transaction.status,
      };
      addTaskToQueue(transactionDetails);
    }
    return res.status(200).send('Webhook received successfully!');
  });

  app.listen(port, () => {
    console.log(`Webhook server is running on port ${port}`);
  });
}
main();
