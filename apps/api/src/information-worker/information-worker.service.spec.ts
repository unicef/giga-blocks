import { Test, TestingModule } from '@nestjs/testing';
import { InformationWorkerService } from './information-worker.service';

describe('InformationWorkerService', () => {
  let service: InformationWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationWorkerService],
    }).compile();

    service = module.get<InformationWorkerService>(InformationWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
