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
} from './processors';
import { MailService } from './mailer.service';
import { MAIL_QUEUE, MINT_QUEUE, IMAGE_QUEUE, ONCHAIN_DATA_QUEUE, CONTRIBUTE_QUEUE } from './constants';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { QueueService } from './queue.service';
import { ContributeDataService } from 'src/contribute/contribute.service';
import { SchoolService } from 'src/schools/schools.service';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: +configService.get('SMTP_PORT'),
          secure: true,
          auth: {
            user: configService.get('EMAIL_ADDRESS'),
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
    }),
    BullModule.registerQueue({
      name: IMAGE_QUEUE,
    }),
    BullModule.registerQueue({
      name: ONCHAIN_DATA_QUEUE,
    }),
    BullModule.registerQueue({
      name: CONTRIBUTE_QUEUE,
    }),
  ],
  providers: [
    MailProcessor,
    MailService,
    QueueService,
    QueueProcessor,
    MintQueueProcessor,
    ImageProcessor,
    ContributeDataService,
    ContributeProcessor,
    SchoolService,
  ],
  exports: [MailService, QueueService],
})
export class MailModule {}
