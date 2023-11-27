import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { MintStatus } from '@prisma/application';

export class ListSchoolDto {
  @ApiProperty({
    description: 'Page to load',
    example: '1',
    required: false,
  })
  @IsString()
  @IsOptional()
  page?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  perPage?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  minted?: MintStatus;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  uploadId?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  connectivityStatus?: string;
}
