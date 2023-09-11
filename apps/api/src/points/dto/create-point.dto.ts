import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LeaderBoardType, ContributionType } from '@prisma/client';

export class CreatePointDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  points: number;

  @ApiProperty({
    example: LeaderBoardType.SEASONAL,
    enum: LeaderBoardType,
  })
  @IsEnum(LeaderBoardType)
  leaderBoardType: LeaderBoardType;

  @ApiProperty({
    example: ContributionType.VOTE,
    enum: ContributionType,
  })
  @IsEnum(ContributionType)
  contributionType: ContributionType;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isConfirmed: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isValid: boolean;

  @ApiProperty({
    description: 'The id of the user',
    example: '3974',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: 'The id of the season',
    example: '242',
  })
  @IsOptional()
  @IsString()
  season_id?: string;

  @ApiProperty({
    description: 'The id of creator user',
    example: '545',
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({
    description: 'The id of contributed data',
    example: '545',
  })
  @IsString()
  contributedDataId: string;
}
