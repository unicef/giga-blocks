import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';

@Module({
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
