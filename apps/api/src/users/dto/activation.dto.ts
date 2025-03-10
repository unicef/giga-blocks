import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserActivationDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
    example: 'john@doe.com',
  })
  email: string;

  @IsOptional()
  @ApiProperty({
    description: 'Wallet address of the user (optional)',
    example: '0x1234567890abcdef1234567890abcdef12345678',
    required: false,
  })
  walletAddress?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Username of the user (optional)',
    example: 'JohnDoe',
    required: false,
  })
  username?: string;

  @IsString()
  @ApiProperty({
    description: 'NFT address to be reserved',
    example: '0xabcdef1234567890abcdef1234567890abcdef12',
  })
  nftAddress: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Flag indicating if the NFT is reserved (optional)',
    example: true,
    required: false,
  })
  nftReserved?: boolean;
}
