import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class VerifyMagicLinkDto {
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

export class SendMagicLinkDto
 {
  @ApiProperty({
    example: 'email@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'http://localhost:3000/schools/12345io',
  })
  @IsString()
  @IsOptional()
  redirectlink: string;
}
