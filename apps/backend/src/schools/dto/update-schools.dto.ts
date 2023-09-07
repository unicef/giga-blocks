import { PartialType } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-schools.dto';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {}
