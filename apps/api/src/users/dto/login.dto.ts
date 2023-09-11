import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsEmail, IsOptional, IsEthereumAddress } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
    example: 'john@doe.com',
  })
  email: string;
}

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
