import { Module } from '@nestjs/common';
import { InformationWorkerService } from './information-worker.service';
import { InformationWorkerController } from './information-worker.controller';
import { QueueService } from 'src/mailer/queue.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports:[PrismaModule,MailModule],
  controllers: [InformationWorkerController],
  providers: [InformationWorkerService],
})
export class InformationWorkerModule {}
