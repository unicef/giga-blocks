import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateContributor } from 'src/contributor/contributor.dto';

export class ReserveNFTDto {
  @ApiProperty({
    description: 'Email of reserver',
    example: 'abcd@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'School ID to mint',
    example: 'uuid',
    required: true,
  })
  @IsString()
  schoolId: string;

  @ApiProperty({
    description: 'Wallet address of reserver',
    example: '0x1f2f6f7952550D4388f9A3fd91A8CdcFbC439978',
    required: false,
  })
  @IsOptional()
  @IsString()
  walletAddress: string;

  @ApiProperty({
    description: 'name  of reserver',
    example: 'joe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of theme',
    example: 'uuid',
    required: false,
  })
  @IsString()
  themeId: string;

  @ApiProperty({
    example: true,
    description: 'isVisible',
  })
  @IsBoolean()
  isVisible?: boolean;
}

export class claimReservedNFT {
  @ApiProperty({
    description: 'Email of reserver',
    example: 'abcd@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Wallet address of reserver',
    example: '0x1f2f6f7952550D4388f9A3fd91A8CdcFbC439978',
    required: true,
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    description: 'School ID to mint',
    example: 'uuid',
    required: true,
  })
  @IsOptional()
  @IsString()
  schoolId: string;
}

export class SchoolActivation {
  @ApiProperty({
    description: 'School ID to mint',
    example: 'uuid',
    required: true,
  })
  @IsString()
  schoolId: string;

  @ApiProperty({
    description: 'ID of theme',
    example: 'uuid',
    required: false,
  })
  @IsString()
  themeId: string;

  @ApiProperty({
    description: 'ID of theme',
    example: 'uuid',
    required: false,
  })
  @IsString()
  transactionHash: string;

  @ApiProperty({
    description: 'Contributor Details',
    example: {
      name: 'Joe',
      isVisible: true,
      walletAddress: '0x1f2f6f7952550D4388f9A3fd91A8CdcFbC439978',
    },
  })
  @ValidateNested()
  @Type(() => CreateContributor)
  contributorData: CreateContributor;
}

export class WeeklyQOSDto {
  @ApiProperty({
    description: 'Giga School ID to fetch QOS data  ',
    example: 'uuid',
    required: true,
  })
  @IsString()
  giga_school_id: string;

  @ApiProperty({
    description: 'Start date of the week',
    example: '2024-05-26',
    required: true,
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    description: 'End date of the week',
    example: '2024-06-02',
    required: true,
  })
  @IsString()
  endDate: string;
}

export class DailyQOSDto {
  @ApiProperty({
    description: 'Giga School ID to fetch QOS data  ',
    example: 'uuid',
    required: true,
  })
  @IsString()
  giga_school_id: string;
}

export class TransactionDetails {
  @ApiProperty({
    description: 'Transaction Hash',
    example: '0x1f2f6f7952550D4388f9A3fd91A8CdcFbC439978',
    required: true,
  })
  @IsString()
  transactionHash: string;

  @ApiProperty({
    description: 'Status of the transaction',
    example: 1,
    required: true,
  })
  @IsString()
  status: number;
}
