import { PartialType } from '@nestjs/swagger';
import { CreateSeasonDto } from './create-seasons.dto';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {}
