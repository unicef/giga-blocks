import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  permissions: string[];

  @ApiProperty()
  name: string;
}
