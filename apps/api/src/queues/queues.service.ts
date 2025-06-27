import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue('MAIL_QUEUE') private readonly mailQueue: Queue,
    @InjectQueue('MINT_QUEUE') private readonly mintQueue: Queue,
    @InjectQueue('IMAGE_QUEUE') private readonly imageQueue: Queue,
    @InjectQueue('ONCHAIN_DATA_QUEUE') private readonly onchainDataQueue: Queue,
    @InjectQueue('CONTRIBUTE_QUEUE') private readonly contributeQueue: Queue,
    @InjectQueue('VC_QUEUE') private readonly vcQueue: Queue,
    @InjectQueue('BULK_IMAGE_QUEUE') private readonly bulkImageQueue: Queue,
  ) {}

  private getQueue(queueName: string): Queue {
    switch (queueName) {
      case 'MAIL_QUEUE':
        return this.mailQueue;
      case 'MINT_QUEUE':
        return this.mintQueue;
      case 'IMAGE_QUEUE':
        return this.imageQueue;
      case 'ONCHAIN_DATA_QUEUE':
        return this.onchainDataQueue;
      case 'CONTRIBUTE_QUEUE':
        return this.contributeQueue;
      case 'VC_QUEUE':
        return this.vcQueue;
      case 'BULK_IMAGE_QUEUE':
        return this.bulkImageQueue;
      default:
        throw new NotFoundException(`Queue ${queueName} not found`);
    }
  }

  async getAllJobs(queueName: string) {
    const queue = this.getQueue(queueName);
    // Get all jobs in the queue (waiting, active, completed, failed, delayed, paused)
    const jobs = await queue.getJobs([
      'waiting',
      'active',
      'completed',
      'failed',
      'delayed',
      'paused',
    ]);

    return Promise.all(
      jobs.map(async job => ({
        id: job.id,
        name: job.name,
        data: job.data,
        attemptsMade: job.attemptsMade,
        failedReason: job.failedReason,
        timestamp: job.timestamp,
        processedOn: job.processedOn,
        finishedOn: job.finishedOn,
        progress: job.progress,
        returnvalue: job.returnvalue,
        status: await job.getState(),
      })),
    );
  }

  async getFailedJobs(queueName: string) {
    const queue = this.getQueue(queueName);
    return queue.getFailed();
  }

  async getCompletedJobs(queueName: string) {
    const queue = this.getQueue(queueName);
    return queue.getCompleted();
  }

  async getPendingJobs(queueName: string) {
    const queue = this.getQueue(queueName);
    return queue.getWaiting();
  }

  async retryJob(queueName: string, jobId: string) {
    const queue = this.getQueue(queueName);
    const job = await queue.getJob(jobId);
    if (!job) throw new NotFoundException(`Job ${jobId} not found in ${queueName}`);
    return job.retry();
  }

  async removeJob(queueName: string, jobId: string) {
    const queue = this.getQueue(queueName);
    const job = await queue.getJob(jobId);
    if (!job) throw new NotFoundException(`Job ${jobId} not found in ${queueName}`);
    return job.remove();
  }
}
