import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

const QUEUE_NAMES = [
  'MAIL_QUEUE',
  'MINT_QUEUE',
  'IMAGE_QUEUE',
  'ONCHAIN_DATA_QUEUE',
  'CONTRIBUTE_QUEUE',
  'VC_QUEUE',
  'BULK_IMAGE_QUEUE',
];

@Controller('queue')
@ApiTags('Queues')
@ApiBearerAuth('access-token')
export class QueuesController {
  constructor(private readonly queueService: QueuesService) {}

  @Public()
  @Get(':queueName/jobs')
  @ApiOperation({ summary: 'List all jobs for a specific queue' })
  async getAllJobs(@Param('queueName') queueName: string) {
    this.validateQueueName(queueName);
    return this.queueService.getAllJobs(queueName);
  }

  @Public()
  @Get(':queueName/failed')
  @ApiOperation({ summary: 'List all failed jobs for a specific queue' })
  async getFailedJobs(@Param('queueName') queueName: string) {
    this.validateQueueName(queueName);
    return this.queueService.getFailedJobs(queueName);
  }

  @Public()
  @ApiOperation({ summary: 'List all completed jobs for a specific queue' })
  @Get(':queueName/completed')
  async getCompletedJobs(@Param('queueName') queueName: string) {
    this.validateQueueName(queueName);
    return this.queueService.getCompletedJobs(queueName);
  }

  // @Public()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Retry a failed job by jobId for a specific queue' })
  @Post(':queueName/retry/:jobId')
  async retryJob(@Param('queueName') queueName: string, @Param('jobId') jobId: string) {
    this.validateQueueName(queueName);
    return this.queueService.retryJob(queueName, jobId);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Remove a job by jobId for a specific queue' })
  @Delete(':queueName/:jobId')
  async removeJob(@Param('queueName') queueName: string, @Param('jobId') jobId: string) {
    this.validateQueueName(queueName);
    return this.queueService.removeJob(queueName, jobId);
  }

  @Public()
  @ApiOperation({ summary: 'Get the pending jobs for a specific queue' })
  @Get(':queueName/pending')
  async getPendingJobs(@Param('queueName') queueName: string) {
    this.validateQueueName(queueName);
    return this.queueService.getPendingJobs(queueName);
  }

  // Optional: Validate queue name to avoid typos or invalid access
  private validateQueueName(queueName: string) {
    if (!QUEUE_NAMES.includes(queueName)) {
      throw new Error(`Invalid queue name: ${queueName}`);
    }
  }
}
