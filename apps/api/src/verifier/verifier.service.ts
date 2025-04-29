import { Injectable } from '@nestjs/common';
import { CreateVerifierDto } from './dto/create-verifier.dto';
import { UpdateVerifierDto } from './dto/update-verifier.dto';

@Injectable()
export class VerifierService {
  getAuthRequest() {
    return `This action returns all verifier`;
  }


  callback(createVerifierDto: CreateVerifierDto) {
    return 'This action adds a new verifier';
  }

}
