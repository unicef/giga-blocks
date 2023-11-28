import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ContributeDataService } from './contribute.service';
import { CreateContributeDatumDto, ValidateDto } from './dto/create-contribute-datum.dto';
import { UpdateContributeDatumDto } from './dto/update-contribute-datum.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiBearerAuth('access-token')
@Controller('contribute')
@ApiTags('Contribute') // Swagger Documentation
export class ContributeDataController {
  constructor(private readonly contributeDataService: ContributeDataService) {}

  @UseGuards(RoleGuard)
  @Roles('CONTRIBUTOR', 'ADMIN')
  @Post()
  create(@Body() createContributeDatumDto: CreateContributeDatumDto, @Req() req: any) {
    return this.contributeDataService.create(createContributeDatumDto, req.user.id);
  }

  @Public()
  @Get()
  findAll(@Query() query: any) {
    return this.contributeDataService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contributeDataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContributeDatumDto: UpdateContributeDatumDto) {
    return this.contributeDataService.update(id, updateContributeDatumDto);
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Patch()
  batchValidate(@Body() updateContributeDatumDto: UpdateContributeDatumDto, @Req() req: any) {
    return this.contributeDataService.batchValidate(updateContributeDatumDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contributeDataService.remove(id);
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Patch('/validate/:id')
  validate(@Param('id') id: string, @Body() ValidateDto: ValidateDto, @Req() req: any) {
    return this.contributeDataService.validate(id, ValidateDto.isValid, req.user.id);
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Get('/validated')
  getValidated() {
    return this.contributeDataService.getValidated();
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Get('/validated/:id')
  getValidatedById(@Param('id') id: string) {
    return this.contributeDataService.getValidatedById(id);
  }
}
