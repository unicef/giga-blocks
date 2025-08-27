import { Module } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { VerifierController } from './verifier.controller';

@Module({
  controllers: [VerifierController],
  providers: [VerifierService],
})
export class VerifierModule {}
