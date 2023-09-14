import { Test, TestingModule } from '@nestjs/testing';
import { PointsService } from './points.service';
import { PrismaAppService } from '../prisma/prisma.service';

describe('PointsService', () => {
  let service: PointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsService, PrismaAppService],
    }).compile();

    service = module.get<PointsService>(PointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
