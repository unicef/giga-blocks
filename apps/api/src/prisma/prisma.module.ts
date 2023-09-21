import { Global, Module } from '@nestjs/common';
import { PrismaAppService } from './prisma.service';
import { PrismaNewsLetterService } from './prisma-newsletter.service';

@Global()
@Module({
  providers: [PrismaNewsLetterService, PrismaAppService],
  exports: [PrismaNewsLetterService, PrismaAppService],
})
export class PrismaModule {}
