import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { MintQueueSingleDto } from './mint-queue.dto';

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
    required: true,
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    description: 'ID of theme',
    example: 'uuid',
    required: false,
  })
  @IsString()
  themeId: string;
}
