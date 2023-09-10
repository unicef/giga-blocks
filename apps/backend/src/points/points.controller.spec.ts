import { Test, TestingModule } from '@nestjs/testing';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LeaderBoardType, ContributionType } from '@prisma/client';

describe('PointsController', () => {
  let controller: PointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsController],
      providers: [PointsService, PrismaService],
    }).compile();

    controller = module.get<PointsController>(PointsController);
  });

  // it('should create point data', async () => {
  //   const data: CreatePointDto = {
  //     points: 1,
  //     leaderBoardType: LeaderBoardType.SEASONAL,
  //     contributionType: ContributionType.VOTE,
  //     isConfirmed: true,
  //     isValid: true,
  //   };
  //   const point = await controller.create(data);
  //   expect(point).toBeDefined();
  //   expect(point.id).toBe(1);
  // });

  it('should update the point data', async () => {
    const data: Partial<CreatePointDto> = {
      points: 2,
    };
    const point = await controller.update('1', data);
    expect(point.points).toBe(2);
  });
});
