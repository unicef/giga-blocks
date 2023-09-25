import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger } from '@nestjs/common';
import { SchoolService } from './schools.service';
import { UpdateSchoolDto } from './dto/update-schools.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListSchoolDto } from './dto/list-schools.dto';
import { Public } from '../common/decorators/public.decorator';
import { QueueService } from 'src/mailer/queue.service';

@Controller('schools')
@ApiTags('School')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly queueService: QueueService,
  ) {}

  @Public()
  @Get('onchainDataQueue')
  queue() {
    return this.queueService.sendTransaction(1);
  }

  @Public()
  @Get('mintQueue')
  mintQueue() {
    return this.queueService.sendMintNFT(1);
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
