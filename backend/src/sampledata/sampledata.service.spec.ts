import { Test, TestingModule } from '@nestjs/testing';
import { SampledataService } from './sampledata.service';

describe('SampledataService', () => {
  let service: SampledataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampledataService],
    }).compile();

    service = module.get<SampledataService>(SampledataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
