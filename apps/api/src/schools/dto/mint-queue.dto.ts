import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export type SchoolData = {
  id: string;
  schoolName: string;
  schoolType: string;
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  connectivity: boolean;
  electricity_availabilty: boolean;
  coverage_availabitlity: string;
};

export class MintQueueDto {
  @ApiProperty()
  @IsString()
  signatureWithData: string;

  @ApiProperty({ type: 'object' })
  data: SchoolData[];
}

export class MintQueueSingleDto {
  @ApiProperty()
  @IsString()
  signatureWithData: string;

  @ApiProperty({ type: 'object' })
  data: SchoolData;
}
