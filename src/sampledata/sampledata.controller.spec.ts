import { Test, TestingModule } from '@nestjs/testing';
import { SampledataController } from './sampledata.controller';

describe('SampledataController', () => {
  let controller: SampledataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampledataController],
    }).compile();

    controller = module.get<SampledataController>(SampledataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
