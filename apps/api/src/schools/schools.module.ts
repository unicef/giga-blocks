import { Module } from '@nestjs/common';
import { SchoolService } from './schools.service';
import { SchoolController } from './schools.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mailer/mailer.module';
import { ConfigService } from '@nestjs/config';
import { ImageProcessor, QueueProcessor } from 'src/mailer/processors';
import { BullModule } from '@nestjs/bull';
import { IMAGE_QUEUE } from 'src/mailer/constants';
import { QueueService } from 'src/mailer/queue.service';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [SchoolController],
  providers: [SchoolService, ConfigService],
})
export class SchoolModule {}
