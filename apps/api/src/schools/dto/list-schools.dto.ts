import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  orderBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  order?: string;

  @ApiProperty({
    required: false,
    example: 'true',
  })
  // @IsBoolean()
  @IsOptional()
  water?: boolean;

  @ApiProperty({
    required: false,
    example: '10',
  })
  @IsOptional()
  teachers?: number;

  @ApiProperty({
    required: false,
    example: '50',
  })
  @IsOptional()
  students?: number;

  @ApiProperty({
    required: false,
    example: true,
  })
  @IsOptional()
  electricity?: boolean;

  @ApiProperty({
    required: false,
    example: '20',
  })
  @IsOptional()
  computers?: number;

  @ApiProperty({
    required: false,
    example: '2',
  })
  @IsOptional()
  download?: number;

  @ApiProperty({
    required: false,
    example: 'ADSL',
  })
  @IsOptional()
  connectionType?: string;
}

export class ListReservedSchoolDto{
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
}
