import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmailService } from './newsletters.service';
import { CreateEmailDto } from './dto/create-newsletters.dto';
import { UpdateEmailDto } from './dto/update-newsletters.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('NewsLetter') // Swagger Documentation
@Controller('newsletters')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Public()
  @Get()
  findAll(@Query('country') country: string) {
    const query = country ? { country } : null;
    return this.emailService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(id, updateEmailDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(id);
  }
}
