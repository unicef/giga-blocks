import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import {
  ContributeProcessor,
  MailProcessor,
  MintQueueProcessor,
  ImageProcessor,
  QueueProcessor,
  VCProcessor,
  BulkImageProcessor,
} from './processors';
import { MailService } from './mailer.service';
import {
  MAIL_QUEUE,
  MINT_QUEUE,
  IMAGE_QUEUE,
  ONCHAIN_DATA_QUEUE,
  CONTRIBUTE_QUEUE,
  VC_QUEUE,
  BULK_IMAGE_QUEUE,
} from './constants';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { QueueService } from './queue.service';
import { ContributeDataService } from 'src/contribute/contribute.service';
import { SchoolService } from 'src/schools/schools.service';
import { MagicLinkService } from 'src/magic-link/magic-link.service';
import { LinkactivationService } from 'src/linkactivation/linkactivation.service';
import { ContributorService } from 'src/contributor/contributor.service';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get('SERVICE_PROVIDER'),
          auth: {
            user: configService.get('EMAIL_USER'), 
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
        defaults: { from: '"No Reply" <no-reply@mailer.com>' },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
    BullModule.registerQueue({
      name: MINT_QUEUE,
      limiter: {
        max: 1,
        duration: 5000,
      },
      defaultJobOptions: {
        removeOnFail: false,
      },
    }),
    BullModule.registerQueue({
      name: IMAGE_QUEUE,
      limiter: {
        max: 1,
        duration: 5000,
      },
      defaultJobOptions: {
        removeOnFail: false,
      },
    }),
    BullModule.registerQueue({
      name: ONCHAIN_DATA_QUEUE,
      defaultJobOptions: {
        removeOnFail: false,
      },
    }),
    BullModule.registerQueue({
      name: CONTRIBUTE_QUEUE,
      defaultJobOptions: {
        removeOnFail: false,
      },
    }),
    BullModule.registerQueue({
      name: VC_QUEUE,
      defaultJobOptions:{
      removeOnFail:false
     }
    }),
     BullModule.registerQueue({
      name: BULK_IMAGE_QUEUE,
      defaultJobOptions:{
      removeOnFail:false
     }
    })
  ],
  providers: [
    MailProcessor,
    MailService,
    QueueService,
    QueueProcessor,
    MintQueueProcessor,
    ImageProcessor,
    BulkImageProcessor,
    ContributeDataService,
    ContributeProcessor,
    VCProcessor,
    MagicLinkService,
    SchoolService,
    LinkactivationService,
    ContributorService,
  ],
  exports: [MailService, QueueService, BullModule],
})
export class MailModule {}
