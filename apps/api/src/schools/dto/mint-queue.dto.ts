import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export type SchoolData = {
  id: string;
  name: string;
  location: string;
  lat: number;
  lon: number;
  connectivity: boolean;
  coverageAvailabitlity: string;
};

export class MintQueueDto {
  @ApiProperty()
  @IsString()
  signatureWithData: string;

  @ApiProperty({ type: 'object' })
  data: SchoolData[];
}
