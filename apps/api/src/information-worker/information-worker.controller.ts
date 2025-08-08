import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InformationWorkerService } from './information-worker.service';
import { CreateInformationWorkerDto } from './dto/create-information-worker.dto';
import { UpdateInformationWorkerDto } from './dto/update-information-worker.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('information-worker')
@ApiTags('Information Worker')
@ApiBearerAuth('access-token')
export class InformationWorkerController {
  constructor(private readonly informationWorkerService: InformationWorkerService) {}

  @Post()
  create(@Body() createInformationWorkerDto: CreateInformationWorkerDto) {
    return this.informationWorkerService.create(createInformationWorkerDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.informationWorkerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationWorkerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformationWorkerDto: UpdateInformationWorkerDto) {
    return this.informationWorkerService.update(id, updateInformationWorkerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.informationWorkerService.remove(+id);
  // }
  @Public()
  @Post('/send-email')
  sendEmail() {
    return this.informationWorkerService.sendEmail();
  }
}
