import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sushant Tripathee',
  })
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Nepal',
  })
  country: string;
}
