import { PartialType } from '@nestjs/swagger';
import { CreateContributeDatumDto } from './create-contribute-datum.dto';

export class UpdateContributeDatumDto extends PartialType(CreateContributeDatumDto) {}
