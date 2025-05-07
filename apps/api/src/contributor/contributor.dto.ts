import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/application';
import Api from 'arweave/node/lib/api';
import { IsBoolean, IsEmail, IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContributor {
  @ApiProperty({
    example: 'Joe',
    description: 'Name of the contributor',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'test@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'uuid',
    description: 'school ID to be reserved',
  })
  @IsString()
  @IsOptional()
  schoolReserved?: string;

  @ApiProperty({
    example: true,
    description: 'isVisible',
  })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @ApiProperty({
    example: '0x1f2f6f7952550D4388f9A3fd91A8CdcFbC439978',
    description: 'Wallet address of the contributor',
  })
  @IsOptional()
  @IsString()
  walletAddress?: string;
}

export class UpdateVisibility {
  @ApiProperty({
    example: true,
    description: 'isVisible',
  })
  @IsBoolean()
  isVisible?: boolean;

  @ApiProperty({
    example: 'Joe',
    description: 'Name of the contributor',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
