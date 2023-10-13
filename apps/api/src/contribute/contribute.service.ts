import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContributeDatumDto } from './dto/create-contribute-datum.dto';
import { UpdateContributeDatumDto } from './dto/update-contribute-datum.dto';
import { PrismaAppService } from '../prisma/prisma.service';
import { CreatePointDto } from 'src/points/dto/create-point.dto';
import { LeaderBoardType, ContributionType, VOTE_TYPE } from '@prisma/application';
import { Status } from '@prisma/application';

@Injectable()
export class ContributeDataService {
  private readonly _logger = new Logger(ContributeDataService.name);
  constructor(private prisma: PrismaAppService) {}

  async create(createContributeDatumDto: CreateContributeDatumDto) {
    const createdData = await this.prisma.contributedData.create({
      data: { ...createContributeDatumDto },
    });
    return createdData;
  }

  async findAll() {
    const data = await this.prisma.contributedData.findMany();
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.contributedData.findUnique({
      where: { id: id },
    });
    if (!data) {
      throw new NotFoundException('Contributed data with such ID not found');
    }
    return data;
  }

  async update(id: string, updateContributeDatumDto: UpdateContributeDatumDto) {
    const updatedData = await this.prisma.contributedData.update({
      where: { id: id },
      data: updateContributeDatumDto,
    });
    return updatedData;
  }

  async remove(id: string) {
    const deletedData = await this.prisma.contributedData.delete({
      where: { id: id },
    });
    if (deletedData) {
      return 'Contributed data deleted successfully.';
    }
  }

  async upvote(id: string, user: any) {
    try {
      const contributedData = await this.findOne(id);
      const check_vote = await this.prisma.vote.findUnique({
        where: {
          giga_vote_contributed_Id: {
            contributed_Id: id,
            user_id: user.id,
          },
        },
      });

      if (check_vote || !contributedData) {
        throw new InternalServerErrorException('User already voted');
      }
      if (contributedData.contributedUserId === user.id) {
        throw new InternalServerErrorException('User cannot vote for their own contribution');
      }
      const voteData = {
        vote_type: VOTE_TYPE.UPVOTE,
        user_id: user.id,
        contributed_Id: id,
        createdBy: user.id,
      };

      const points1: CreatePointDto = {
        leaderBoardType: LeaderBoardType.GENERAL,
        contributionType: ContributionType.VOTE,
        isConfirmed: false,
        isValid: false,
        points: 1,
        user_id: user.id,
        createdBy: user.id,
        season_id: null,
        contributedDataId: id,
      };
      const points2: CreatePointDto = {
        leaderBoardType: LeaderBoardType.GENERAL,
        contributionType: ContributionType.CONTRIBUTE,
        isConfirmed: false,
        isValid: false,
        points: 2,
        user_id: contributedData.contributedUserId,
        createdBy: user.id,
        season_id: null,
        contributedDataId: id,
      };
      if (contributedData.season_ID) {
        points1.leaderBoardType = LeaderBoardType.SEASONAL;
        points1.season_id = contributedData.season_ID;
        points2.leaderBoardType = LeaderBoardType.SEASONAL;
        points2.season_id = contributedData.season_ID;
      }
      const transaction = await this.prisma.$transaction([
        this.prisma.vote.create({ data: voteData }),
        this.prisma.points.create({ data: points1 }),
        this.prisma.points.create({ data: points2 }),
      ]);

      this._logger.log(`User ${user.id} upvoted ${id} and successfully created points`);

      return transaction;
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async downvote(id: string, user: any) {
    try {
      const contributedData = await this.findOne(id);
      const check_vote = await this.prisma.vote.findUnique({
        where: {
          giga_vote_contributed_Id: {
            contributed_Id: id,
            user_id: user.id,
          },
        },
      });
      if (check_vote) {
        throw new InternalServerErrorException('User already voted');
      }
      if (contributedData.contributedUserId === user.id) {
        throw new InternalServerErrorException('User cannot vote for their own contribution');
      }
      const vote = await this.prisma.vote.create({
        data: {
          vote_type: VOTE_TYPE.DOWNVOTE,
          user_id: user.id,
          contributed_Id: id,
          createdBy: user.id,
        },
      });
      this._logger.log(`User ${user.id} downvoted ${id}`);
      return vote;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validate(id: string, isValid: boolean) {
    try {
      const contributedData = await this.findOne(id);
      let transaction;
      if (!contributedData) {
        throw new NotFoundException('Contributed data with such ID not found');
      }
      if (isValid) {
        transaction = await this.prisma.$transaction([
          this.prisma.points.updateMany({
            where: {
              contributedDataId: id,
            },
            data: {
              isValid: true,
              isConfirmed: true,
              leaderBoardType: LeaderBoardType.GLOBAL,
            },
          }),
          this.prisma.contributedData.update({
            data: { status: Status.Validated },
            where: { id: id },
          }),
        ]);
      } else {
        transaction = await this.prisma.$transaction([
          this.prisma.points.updateMany({
            where: {
              contributedDataId: id,
            },
            data: {
              isValid: false,
              isConfirmed: true,
              leaderBoardType: LeaderBoardType.GLOBAL,
            },
          }),
          this.prisma.contributedData.update({
            data: { status: Status.Rejected },
            where: { id: id },
          }),
        ]);
      }
      return transaction;
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
