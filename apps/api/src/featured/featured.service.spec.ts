import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedService } from './featured.service';

describe('FeaturedService', () => {
  let service: FeaturedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturedService],
    }).compile();

    service = module.get<FeaturedService>(FeaturedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
