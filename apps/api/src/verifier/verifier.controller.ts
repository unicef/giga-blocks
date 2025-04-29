import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { CreateVerifierDto } from './dto/create-verifier.dto';
import { UpdateVerifierDto } from './dto/update-verifier.dto';

@Controller('verifier')
export class VerifierController {
  constructor(private readonly verifierService: VerifierService) {}
  
  @Get('/sign-in')
  signIn() {
    return this.verifierService.getAuthRequest();
  }

  @Post('/callback')
  callBack(@Body() createVerifierDto: CreateVerifierDto) {
    return this.verifierService.callback(createVerifierDto);
  }


}
