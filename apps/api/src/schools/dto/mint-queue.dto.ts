import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsString } from 'class-validator';

export interface SchoolData {
  id: string;
  giga_school_id: string;
  schoolName: string;
  schoolType: string;
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  connectivity: string;
  electricity_availabilty: boolean;
  coverage_availabitlity: string;
}

export class MintQueueDto {
  @ApiProperty()
  @IsArray()
  data: SchoolData[];
}

export class MintQueueSingleDto {
  @ApiProperty()
  @IsObject()
  data: SchoolData;
}
