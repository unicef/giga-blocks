import { Module } from '@nestjs/common';
import { ContributeDataService } from './contribute.service';
import { ContributeDataController } from './contribute.controller';
import { PointsService } from 'src/points/points.service';

@Module({
  controllers: [ContributeDataController],
  providers: [ContributeDataService, PointsService],
})
export class ContributeDataModule {}
