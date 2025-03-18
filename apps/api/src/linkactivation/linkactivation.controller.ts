import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { LinkactivationService } from './linkactivation.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ActivationLogDTO,
  UpdateSchoolThemeAndContributorDTO,
} from './dto/create-activation-log.dto';

@ApiBearerAuth('access-token')
@Controller('linkactivation')
@ApiTags('LinkActivation')
export class LinkactivationController {
  constructor(private readonly linkactivationService: LinkactivationService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  createLink(@Body() data: ActivationLogDTO, @Req() req: any) {
    return this.linkactivationService.createLink(data, req.user.id);
  }

  @Public()
  @Get('')
  async listLinks() {
    return this.linkactivationService.listLinks();
  }

  @Public()
  @Get('/getActivation/:uuid')
  async getActivation(@Param('uuid') uuid: string) {
    return this.linkactivationService.getActivation(uuid);
  }

  @Public()
  @Get('/validateLink/:uuid')
  async validateLink(@Param('uuid') uuid: string) {
    return this.linkactivationService.validateLink(uuid);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/deactivate/:uuid')
  async deactivateLink(@Param('uuid') uuid: string, @Req() req: any) {
    return this.linkactivationService.deactivateLink(uuid, req.user.id);
  }

  @Post('/createUserTheme')
  async createUserThemeImage(@Body() data: UpdateSchoolThemeAndContributorDTO) {
    return this.linkactivationService.updateSchoolThemeAndContributor(data);
  }
  
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/activate/:uuid')
  async activateLink(@Param('uuid') uuid: string, @Req() req: any) {
    return this.linkactivationService.activateLink(uuid, req.user.id);
  }
}
