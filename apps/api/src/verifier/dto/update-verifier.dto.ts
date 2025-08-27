import { PartialType } from '@nestjs/swagger';
import { CreateVerifierDto } from './create-verifier.dto';

export class UpdateVerifierDto extends PartialType(CreateVerifierDto) {}
