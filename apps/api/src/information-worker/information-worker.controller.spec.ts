import { Test, TestingModule } from '@nestjs/testing';
import { InformationWorkerController } from './information-worker.controller';
import { InformationWorkerService } from './information-worker.service';

describe('InformationWorkerController', () => {
  let controller: InformationWorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationWorkerController],
      providers: [InformationWorkerService],
    }).compile();

    controller = module.get<InformationWorkerController>(InformationWorkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
