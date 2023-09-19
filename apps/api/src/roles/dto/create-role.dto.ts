import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from '@prisma/application';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    enum: Role,
  })
  @IsEnum(Role)
  name: Role;
}
