import { Test, TestingModule } from '@nestjs/testing';
import { ContributorController } from './contributor.controller';

describe('ContributorController', () => {
  let controller: ContributorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributorController],
    }).compile();

    controller = module.get<ContributorController>(ContributorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
