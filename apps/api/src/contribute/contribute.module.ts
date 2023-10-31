import { Module } from '@nestjs/common';
import { ContributeDataService } from './contribute.service';
import { ContributeDataController } from './contribute.controller';

@Module({
  controllers: [ContributeDataController],
  providers: [ContributeDataService],
})
export class ContributeDataModule {}
