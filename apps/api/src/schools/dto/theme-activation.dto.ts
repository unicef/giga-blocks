import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ThemeActivationDto {
  @ApiProperty()
  @IsString()
  themeId: string;
}
