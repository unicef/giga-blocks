import { Module } from '@nestjs/common';
import { ContributorController } from './contributor.controller';
import { ContributorService } from './contributor.service';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports:[MailModule],
  controllers: [ContributorController],
  providers: [ContributorService]
})
export class ContributorModule {}
