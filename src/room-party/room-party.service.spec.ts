import { Test, TestingModule } from '@nestjs/testing';
import { RoomPartyService } from './room-party.service';

describe('RoomPartyService', () => {
  let service: RoomPartyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomPartyService],
    }).compile();

    service = module.get<RoomPartyService>(RoomPartyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
