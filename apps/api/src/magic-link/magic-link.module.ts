import { Module } from '@nestjs/common';
import { MagicLinkController } from './magic-link.controller';
import { MagicLinkService } from './magic-link.service';
import { UsersService } from '../users/users.service';
import { MailModule } from 'src/mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MailModule,JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: +process.env.JWT_EXPIRATION_TIME },
        }),],
    controllers: [MagicLinkController],
    providers: [MagicLinkService,UsersService],
})

export class MagicLinkModule {}
