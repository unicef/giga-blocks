import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeasonService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-seasons.dto';
import { Public } from '../common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('seasons')
@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Public()
  @ApiOperation({ summary: 'Create a new season' })
  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonService.create(createSeasonDto);
  }

  @ApiOperation({ summary: 'Get list of all season' })
  @Get()
  findAll() {
    return this.seasonService.findAll();
  }

  @ApiOperation({ summary: 'Get one season with ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a new season' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonService.remove(id);
  }
}
