import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LinkactivationService } from './linkactivation.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ActivationLogDTO } from './dto/create-activation-log.dto';

@Controller('link-activation')
@ApiTags('Link Activation')
export class LinkactivationController {
    constructor(private readonly linkactivationService: LinkactivationService) {}

    // @Roles('ADMIN')
    // @UseGuards(JwtAuthGuard,RoleGuard)
    @Public()
    @Post('/activate')
     activateLink(@Body()data:ActivationLogDTO){
        return this.linkactivationService.activateLink(data)
    }

    @Public()
    @Get('/getLatestActivation')
    async getLatestActivation(){
        return this.linkactivationService.getLatestActivation()
    }

    @Public()
    @Get('/getActivation/:uuid')
    async getActivation(
        @Param('uuid') uuid: string
    ){
      return this.linkactivationService.getActivation(uuid)
    }

    @Public()
    @Get('/validateLink/:uuid')
    async validateLink(
        @Param('uuid') uuid: string
    ){
        return this.linkactivationService.validateLink(uuid)
    }

    
}
