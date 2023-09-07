import { IsString } from 'class-validator';
import { Season_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty({
    example: 'Summer season',
  })
  @IsString()
  season_name: string;

  @ApiProperty({
    example: 'Start',
  })
  @IsString()
  season_status: Season_Status;

  @ApiProperty({
    example: '2023-08-15T08:20:05.565Z',
  })
  @IsString()
  season_start_date: Date;

  @ApiProperty({
    example: '2023-08-15T08:20:05.565Z',
  })
  @IsString()
  season_end_date: Date;
}
