import { ApiProperty } from '@nestjs/swagger';
import { ContributionType, LeaderBoardType } from '@prisma/client';

export class PointEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  points: number;

  @ApiProperty()
  leaderBoardType: LeaderBoardType;

  @ApiProperty()
  contributionType: ContributionType;

  @ApiProperty()
  isConfirmed: boolean;

  @ApiProperty()
  isValid: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  season_id: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  user_id: string;
}
