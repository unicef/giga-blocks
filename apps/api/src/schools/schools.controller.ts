import { Controller, Get, Body, Patch, Param, Query, Post, UseGuards, Req } from '@nestjs/common';
import { SchoolService } from './schools.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListSchoolDto } from './dto/list-schools.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { MintQueueDto, MintQueueSingleDto } from './dto/mint-queue.dto';
import { MintStatus } from '@prisma/application';

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
  @Patch('/update/:id')
  update(@Param('id') id: string, @Req() req: any) {
    return this.schoolService.update(id, req.user.id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('mintBulk')
  mintBatchSchool(@Body() MintData: MintQueueDto) {
    return this.schoolService.checkAdminandMintQueue(MintData);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('mintSchool')
  mintSchool(@Body() MintData: MintQueueSingleDto) {
    return this.schoolService.checkAdminandSingleMintQueue(MintData);
  }

  @Public()
  @ApiQuery({ name: 'minted', enum: MintStatus, required: false })
  @Get('schoolCount')
  countSchools(@Query('minted') minted: MintStatus) {
    const query: ListSchoolDto = {
      minted,
    };
    return this.schoolService.countSchools(query);
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
}
