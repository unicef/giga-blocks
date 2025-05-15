import { PartialType } from '@nestjs/swagger';
import { CreateInformationWorkerDto } from './create-information-worker.dto';

export class UpdateInformationWorkerDto extends PartialType(CreateInformationWorkerDto) {}
