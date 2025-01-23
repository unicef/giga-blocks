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
      urls: ['amqp://guest:guest@localhost:5672'],
      ampqProviderName: 'AMQP_CONNECTION',
      queues: [{ name: 'SCHOOL_QUEUE', durable: true }],
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
  ],
  providers: [],
})
export class AppModule {}
