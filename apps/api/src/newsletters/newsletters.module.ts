import { Module } from '@nestjs/common';
import { EmailService } from './newsletters.service';
import { EmailController } from './newsletters.controller';
import { MailModule } from '../mailer/mailer.module';

@Module({
  imports: [MailModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
