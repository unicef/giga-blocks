import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PointEntity } from './entities/point.entity';
import { Public } from '../common/decorators/public.decorator';

@Controller('points')
@ApiTags('Points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  @ApiCreatedResponse({ type: PointEntity })
  async create(@Body() createPointDto: CreatePointDto) {
    const point = await this.pointsService.create(createPointDto);
    return point;
  }

  @Public()
  @Get()
  @ApiQuery({ name: 'user_id', required: false })
  @ApiQuery({ name: 'season_id', required: false })
  @ApiQuery({ name: 'createdBy', required: false })
  @ApiOkResponse({ type: PointEntity, isArray: true })
  findAll(
    @Query('user_id') user_id: string,
    @Query('season_id') season_id: string,
    @Query('createdBy') createdBy: string,
  ) {
    let query;
    if (user_id || season_id || createdBy) {
      query = { user_id, season_id, createdBy };
    }
    return this.pointsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: PointEntity })
  findOne(@Param('id') id: string) {
    return this.pointsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PointEntity })
  update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
    return this.pointsService.update(+id, updatePointDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PointEntity })
  remove(@Param('id') id: string) {
    return this.pointsService.remove(+id);
  }
}
