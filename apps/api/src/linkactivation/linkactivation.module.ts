import { Module } from '@nestjs/common';
import { LinkactivationController } from './linkactivation.controller';
import { LinkactivationService } from './linkactivation.service';

@Module({
  controllers: [LinkactivationController],
  providers: [LinkactivationService]
})
export class LinkactivationModule {}
