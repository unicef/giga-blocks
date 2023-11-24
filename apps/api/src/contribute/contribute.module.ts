import { Module } from '@nestjs/common';
import { ContributeDataService } from './contribute.service';
import { ContributeDataController } from './contribute.controller';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailModule],
  controllers: [ContributeDataController],
  providers: [ContributeDataService],
})
export class ContributeDataModule {}
