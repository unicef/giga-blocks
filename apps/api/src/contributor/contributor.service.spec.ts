import { Test, TestingModule } from '@nestjs/testing';
import { ContributorService } from './contributor.service';

describe('ContributorService', () => {
  let service: ContributorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributorService],
    }).compile();

    service = module.get<ContributorService>(ContributorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
