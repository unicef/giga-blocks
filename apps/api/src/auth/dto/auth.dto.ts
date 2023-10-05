import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'email@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  otp: string;
}

export class AuthSendOtp {
  @ApiProperty({
    example: 'email@email.com',
  })
  @IsEmail()
  email: string;
}

export class RefreshToken {
  @ApiProperty({
    example: 'dnsfb6829uhfjhbeiwy89ufgo',
  })
  @IsString()
  refresh: string;
}

export class AuthWallet {
  @ApiProperty({
    example: '0x1234567890',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    example: '0x1234567890',
  })
  @IsString()
  signature: string;
}

export class WalletRegister {
  @ApiProperty({
    example: '0x1234567890',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    example: '0x1234567890',
  })
  @IsString()
  signature: string;

  @ApiProperty({
    example: '0x1234567890',
  })
  @IsString()
  name: string;
}
