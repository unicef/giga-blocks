import {Body, Controller, Post, Request} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthSendOtp,AuthDto } from '../auth/dto';
import { ResponseMessage } from '../auth/types';
import { Public } from '../common/decorators/public.decorator';

import { MagicLinkService } from './magic-link.service';

@Controller('magic-link')
@ApiTags('Magic Link')
export class MagicLinkController {
    constructor(private magicLinkService: MagicLinkService) {}
    
    @Public()
    @Post('send')
    async sendMagicLink(@Body() AuthDto: AuthSendOtp): Promise<ResponseMessage | null> {
        return this.magicLinkService.sendMagicLink(AuthDto)
    }

    @Public()
    @Post('verify')
    async verifyMagicLink(@Body() AuthDto: AuthDto): Promise<ResponseMessage | null> {
        return this.magicLinkService.verifyMagicLink(AuthDto)
    }

}