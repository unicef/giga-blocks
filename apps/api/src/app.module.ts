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
import { SeasonModule } from './seasons/seasons.module';
import { PointsModule } from './points/points.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: +configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PrismaModule,
    MailModule,
    SchoolModule,
    UsersModule,
    ContributeDataModule,
    SeasonModule,
    PointsModule,
    EmailModule,
    QueueModule,
  ],
  providers: [],
})
export class AppModule {}
