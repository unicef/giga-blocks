import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('verifier')
@ApiTags('Verifier')
export class VerifierController {
  constructor(private readonly verifierService: VerifierService) {}
 
  @Public()
  @Get('/sign-in/:schoolId')
  getAuthRequest(@Param('schoolId') schoolId: any, @Body()data:any): ReturnType<VerifierService['getAuthRequest']> {
    console.log('getAuthRequest', data);
    return this.verifierService.getAuthRequest(schoolId,data);
  }

  @Public()
  @Post('/callback')
  callBack(@Req() req:Request) {
    console.log("here controller",req)
    return this.verifierService.callback(req);
  }


}
