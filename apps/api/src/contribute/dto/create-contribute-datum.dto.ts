import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/application';
import { IsBoolean, IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContributeDatumDto {
  @ApiProperty({
    example: '{"key": "value"}',
    description: 'JSON value with key value pair',
  })
  @IsNotEmpty()
  @IsJSON()
  contributed_data: string;

  @ApiProperty({
    example: 'Pending',
    enum: Status,
  })
  @IsOptional()
  @IsString()
  status?: Status;

  @ApiProperty({
    example: 'school-id',
  })
  @IsString()
  school_Id: string;

  @ApiProperty({
    example: 'season-id',
  })
  @IsOptional()
  @IsString()
  season_ID?: string;
}

export class ValidateDto {
  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isValid: boolean;
}
