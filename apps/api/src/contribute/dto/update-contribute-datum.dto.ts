import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
    description: 'ID',
  })
  @IsOptional()
  @IsString()
  contributedUserId: string;
}

export class ApproveContributeDatumDto {
  @ApiProperty({
    example: 'ID',
    description: 'ID',
  })
  @IsNotEmpty()
  @IsArray()
  id: string[];
}
