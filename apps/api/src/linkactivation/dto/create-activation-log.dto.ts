import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';
import { ActivationStatus } from '@prisma/application';

export class ActivationLogDTO {
  @ApiProperty({
    description: 'Active status: ACTIVE or INACTIVE',
    example: 'ACTIVE',
    required: true,
  })
  @IsString()
  status: ActivationStatus;

  @ApiProperty({
    description: 'Name of the event',
    example: 'Event Name',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Start date of activation in ISO format',
    example: '2025-02-24T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date of activation in ISO format',
    example: '2025-03-24T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate: string;
}

export class UpdateSchoolThemeAndContributorDTO {
  @ApiProperty({
    description: 'ID of School',
    example: 'uuid',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'ID of theme',
    example: 'uuid',
    required: false,
  })
  @IsDateString()
  themeId: string;

  @ApiProperty({
    description: 'Wallet address of contributor',
    example: '0xabcdef',
    required: false,
  })
  @IsDateString()
  walletAddress: any;

  @ApiProperty({
    description: 'Email of contirbutor',
    example: 'example@example.com',
    required: false,
  })
  @IsString()
  email: string | null;

  @ApiProperty({
    description: 'Address of NFT',
    example: '0xabcdef',
    required: true,
  })
  @IsString()
  nftAddress: string | null;

  @ApiProperty({
    description: 'Number of NFT minted',
    example: '10',
    required: false,
  })
  @IsString()
  totalNftMinted: number | null;

  @ApiProperty({
    description: 'Is visible?',
    example: 'true',
    required: false,
  })
  @IsString()
  isVisible: boolean;

  @ApiProperty({
    description: 'Is NFT reserved?',
    example: 'true',
    required: false,
  })
  @IsString()
  nftReserved: boolean;

  @ApiProperty({
    description: 'Is NFT claimed',
    example: 'false',
    required: false,
  })
  @IsString()
  nftClaimed: boolean;
}

enum ACTIVE_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
