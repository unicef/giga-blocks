import { Module } from '@nestjs/common';
import { InformationWorkerService } from './information-worker.service';
import { InformationWorkerController } from './information-worker.controller';

@Module({
  controllers: [InformationWorkerController],
  providers: [InformationWorkerService],
})
export class InformationWorkerModule {}
