import { Module } from '@nestjs/common';
import { SeasonService } from './seasons.service';
import { SeasonController } from './seasons.controller';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
