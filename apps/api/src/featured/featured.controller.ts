import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FeaturedService } from './featured.service';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiBearerAuth('access-token')
@ApiTags('Featured')
@Controller('featured')
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) {}

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createFeaturedDto: CreateFeaturedDto, @Req() req: any) {
    return this.featuredService.create(createFeaturedDto,req.user.id);
  }

  @Get()
  findAll() {
    return this.featuredService.findAll();
  }

  @Get('/school')
  findFeatureSchool(@Query() query:any) {
    return this.featuredService.findFeatureSchool(query);
  }

  
}
