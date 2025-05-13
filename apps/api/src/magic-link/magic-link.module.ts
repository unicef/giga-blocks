import { Module } from '@nestjs/common';
import { MagicLinkController } from './magic-link.controller';
import { MagicLinkService } from './magic-link.service';
import { UsersService } from '../users/users.service';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailModule],
  controllers: [MagicLinkController],
  providers: [MagicLinkService, UsersService],
})
export class MagicLinkModule {}
