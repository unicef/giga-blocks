import {Body, Controller, Post, Request} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../auth/types';
import { Public } from '../common/decorators/public.decorator';

import { MagicLinkService } from './magic-link.service';
import { SendMagicLinkDto, VerifyMagicLinkDto } from './dto/magic-link.dto';

@Controller('magic-link')
@ApiTags('Magic Link')
export class MagicLinkController {
    constructor(private magicLinkService: MagicLinkService) {}
    
    @Public()
    @Post('send')
    @ApiOperation({ summary: 'Send Magic Link' })
    async sendMagicLink(@Body() AuthDto: SendMagicLinkDto): Promise<ResponseMessage | null> {
        return this.magicLinkService.sendMagicLink(AuthDto)
    }

    @Public()
    @Post('verify')
    @ApiOperation({ summary: 'Verify Magic Link' })
    async verifyMagicLink(@Body() AuthDto: VerifyMagicLinkDto): Promise<ResponseMessage | null> {
        return this.magicLinkService.verifyMagicLink(AuthDto)
    }

}