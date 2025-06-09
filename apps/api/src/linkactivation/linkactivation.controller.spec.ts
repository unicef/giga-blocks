import { Test, TestingModule } from '@nestjs/testing';
import { LinkactivationController } from './linkactivation.controller';

describe('LinkactivationController', () => {
  let controller: LinkactivationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkactivationController],
    }).compile();

    controller = module.get<LinkactivationController>(LinkactivationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
