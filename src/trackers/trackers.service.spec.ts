import { Test, TestingModule } from '@nestjs/testing';
import { TrackersService } from './trackers.service';

describe('TrackersService', () => {
  let service: TrackersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackersService],
    }).compile();

    service = module.get<TrackersService>(TrackersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
