import { Test, TestingModule } from '@nestjs/testing';
import { LinkactivationService } from './linkactivation.service';

describe('LinkactivationService', () => {
  let service: LinkactivationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkactivationService],
    }).compile();

    service = module.get<LinkactivationService>(LinkactivationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
