import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './schools.controller';
import { SchoolService } from './schools.service';

describe('SchoolController', () => {
  let controller: SchoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [SchoolService],
    }).compile();

    controller = module.get<SchoolController>(SchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
