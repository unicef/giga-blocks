import { Test, TestingModule } from '@nestjs/testing';
import { VerifierService } from './verifier.service';

describe('VerifierService', () => {
  let service: VerifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifierService],
    }).compile();

    service = module.get<VerifierService>(VerifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
