import { Module } from '@nestjs/common';
import { SchoolService } from './schools.service';
import { SchoolController } from './schools.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
