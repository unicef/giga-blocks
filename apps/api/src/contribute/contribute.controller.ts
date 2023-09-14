import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContributeDataService } from './contribute.service';
import { CreateContributeDatumDto, ValidateDto } from './dto/create-contribute-datum.dto';
import { UpdateContributeDatumDto } from './dto/update-contribute-datum.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('contribute')
@ApiTags('Contribute') // Swagger Documentation
export class ContributeDataController {
  constructor(private readonly contributeDataService: ContributeDataService) {}

  @Post()
  create(@Body() createContributeDatumDto: CreateContributeDatumDto) {
    return this.contributeDataService.create(createContributeDatumDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.contributeDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contributeDataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContributeDatumDto: UpdateContributeDatumDto) {
    return this.contributeDataService.update(id, updateContributeDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contributeDataService.remove(id);
  }

  @Roles('CONTRIBUTOR')
  @Post('upvote/:id')
  upvote(@Param('id') id: string, @Request() req: any) {
    return this.contributeDataService.upvote(id, req.user);
  }

  @Roles('CONTRIBUTOR')
  @Post('downvote/:id')
  downvote(@Param('id') id: string, @Request() req: any) {
    return this.contributeDataService.downvote(id, req.user);
  }

  @Roles('VALIDATOR', 'ADMIN')
  @Post('validate/:id')
  validate(@Param('id') id: string, @Body() ValidateDto: ValidateDto) {
    return this.contributeDataService.validate(id, ValidateDto.isValid);
  }
}
