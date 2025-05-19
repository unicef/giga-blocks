import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailModule],
  controllers: [QueuesController],
  providers: [QueuesService],
})
export class QueuesModule {}
