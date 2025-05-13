import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FeaturedService } from './featured.service';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@ApiBearerAuth('access-token')
@ApiTags('Featured')
@Controller('featured')
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) {}

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create Featured country' })
  create(@Body() createFeaturedDto: CreateFeaturedDto, @Req() req: any) {
    return this.featuredService.create(createFeaturedDto,req.user.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of all featured countries' })
  findAll() {
    return this.featuredService.findAll();
  }

  @Public()
  @Get('/school')
  @ApiOperation({ summary: 'List of  featured schools for latest featured country' })
  findFeatureSchool(@Query() query:any) {
    return this.featuredService.findFeatureSchool(query);
  }

  
}
