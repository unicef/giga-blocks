import express from 'express';
import {Queue} from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

const app = express();
const port = process.env.WEBHOOK_PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
})


const webHookQueue = new Queue('WEBHOOK_QUEUE', {
  connection: connection,
  defaultJobOptions: {
    removeOnComplete: false,
    removeOnFail: false,
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

const addTaskToQueue = async(payload:any): Promise<void> => {
    try{
        await webHookQueue.add('PROCESS_SUCCESS_TXN',payload,{})
    }
    catch(error){
        console.error("Error adding task to queue:", error);
    }
}


app.post('/webhook', (req,res)=>{
     if (req.body.webhookId) {
      console.log("Webhook ID:", req.body.webhookId);
    }
    if (req.body.event && req.body.event.data) {
      console.log("Event Data:", req.body.event.data);
      if (req.body.event.data.block && req.body.event.data.block.number) {
        console.log("Block Number:", req.body.event.data.block.number);
      }
      if (req.body.event.data.logs && req.body.event.data.logs.length > 0) {
        console.log("First Log Topics:", req.body.event.data.logs[0].topics);
      }

      const payload ={
        transactionHash: req.body.event.data.block.logs[0].transaction.hash,
        status: req.body.event.data.block.logs[0].transaction.status
      }
      addTaskToQueue(payload);
    }
  return res.status(200).send("Webhook received successfully!");
})

app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});