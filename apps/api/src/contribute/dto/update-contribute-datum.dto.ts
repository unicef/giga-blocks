import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/application';
import { IsArray, IsBoolean, IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContributeDatumDto {
  @ApiProperty({
    example: '{"key": "value"}',
    description: 'JSON value with key value pair',
  })
  @IsNotEmpty()
  @IsArray()
  contributions: any;

  @ApiProperty({
    example: 'ID',
    description: 'ID'
  })
  @IsOptional()
  @IsString()
  contributedUserId: string;

}

