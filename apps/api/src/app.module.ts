import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mailer/mailer.module';
import { SchoolModule } from './schools/schools.module';
import { EmailModule } from './newsletters/newsletters.module';
import { UsersModule } from './users/users.module';
import { ContributeDataModule } from './contribute/contribute.module';
import { PrismaAppService } from './prisma/prisma.service';
import {RabbitMQModule, WorkerModule} from "@rumsan/rabbitmq";
import { SchoolWorker } from './workers/school.rabbitmq.worker';
import { UpdateOnchainDataWorker } from './workers/update-onchain.rabbitmq.worker';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { AMQP_CONNECTION, QUEUES } from './constants';
import { QOSDataWorker } from './workers/qos-onchain.rabbitmq.worker';
import { QOSDataFetchWorker } from './workers/get-qos-file.rabbitmq.worker';
import { MagicLinkModule } from './magic-link/magic-link.module';
import { ContributorModule } from './contributor/contributor.module';
import { LinkactivationModule } from './linkactivation/linkactivation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: +configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD')
        },
      }),
      inject: [ConfigService],
    }),
    RabbitMQModule.register({
      urls: [process.env.RABBIT_MQ_URL],
      ampqProviderName: AMQP_CONNECTION,
      queues: [{ name: QUEUES.UPDATE_ONCHAIN, durable: true }, { name: QUEUES.QOS_QUEUE, durable: true }, {name: QUEUES.QOS_FETCH_QUEUE, durable: true}],
      workerModuleProvider: WorkerModule.register({ 
        globalDataProvider: {
          prismaService: PrismaAppService,
        },
        workers: [
          {
            provide: 'SchoolWorker1',
            useClass: SchoolWorker,
          },
          {
            provide: 'SchoolWorker1',
            useClass: UpdateOnchainDataWorker,
          },
          {
            provide: 'QOSWorker',
            useClass: QOSDataWorker,
          },
          {
            provide: 'QOSDataFetchWorker',
            useClass: QOSDataFetchWorker,
          }
        ],
      }),
    }),
    AuthModule,
    PrismaModule,
    MailModule,
    SchoolModule,
    UsersModule,
    ContributeDataModule,
    EmailModule,
    ScheduleModule.forRoot(),
    CronModule,
    MagicLinkModule,
    ContributorModule,
    LinkactivationModule
  ],
  providers: [],
})
export class AppModule {}
