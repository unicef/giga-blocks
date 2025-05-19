import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mailer/mailer.module';
import { SchoolModule } from './schools/schools.module';
import { EmailModule } from './newsletters/newsletters.module';
import { UsersModule } from './users/users.module';
import { ContributeDataModule } from './contribute/contribute.module';
import { PrismaAppService } from './prisma/prisma.service';
import { RabbitMQModule, WorkerModule } from '@rumsan/rabbitmq';
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
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { FeaturedModule } from './featured/featured.module';
import { VerifierModule } from './verifier/verifier.module';
import { InformationWorkerModule } from './information-worker/information-worker.module';
import { QueuesModule } from './queues/queues.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule], // Add ConfigModule to access ConfigService
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        const redisPassword = configService.get<string>('REDIS_PASSWORD');
        const redisUrl = redisPassword
          ? `redis://:${redisPassword}@${redisHost}:${redisPort}`
          : `redis://${redisHost}:${redisPort}`;
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv(redisUrl),
          ],
        };
      },
      isGlobal: true,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: +configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    RabbitMQModule.register({
      urls: [process.env.RABBIT_MQ_URL],
      ampqProviderName: AMQP_CONNECTION,
      queues: [
        { name: QUEUES.UPDATE_ONCHAIN, durable: true },
        { name: QUEUES.QOS_QUEUE, durable: true },
        { name: QUEUES.QOS_FETCH_QUEUE, durable: true },
      ],
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
          },
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
    LinkactivationModule,
    FeaturedModule,
    VerifierModule,
    InformationWorkerModule,
    QueuesModule
  ],
  providers: [],
})
export class AppModule {}
