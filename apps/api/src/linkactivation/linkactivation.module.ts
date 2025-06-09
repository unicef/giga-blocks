import { Module } from '@nestjs/common';
import { LinkactivationController } from './linkactivation.controller';
import { LinkactivationService } from './linkactivation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [LinkactivationController],
  providers: [LinkactivationService, ConfigService],
})
export class LinkactivationModule {}
