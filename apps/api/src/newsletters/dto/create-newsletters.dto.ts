import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email@email.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Jon Doe',
  })
  fullname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Nepal',
  })
  country: string;
}
