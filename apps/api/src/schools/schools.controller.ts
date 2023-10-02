import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SchoolService } from './schools.service';
import { UpdateSchoolDto } from './dto/update-schools.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListSchoolDto } from './dto/list-schools.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('schools')
@ApiTags('School')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('onchainDataQueue')
  queue() {
    return this.schoolService.queueOnchainData(1);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('mintBulk')
  mintBatchSchool(@Body() signatureWithData: string) {
    return this.schoolService.checkAdminandMintQueue(signatureWithData);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('mintSchool')
  mintSchool() {
    return this.schoolService.checkAdminandSingleMintQueue();
  }

  @Public()
  @Get()
  findAll(@Query() query: ListSchoolDto) {
    return this.schoolService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(`${id}`);
  }

  @Public()
  @Get('byCountry/:country')
  findByCountry(@Param('country') country: string) {
    return this.schoolService.byCountry(`${country}`);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(+id, updateSchoolDto);
  }

  @Delete()
  removeAll() {
    return this.schoolService.removeAll();
  }
}
