import { Test, TestingModule } from '@nestjs/testing';
import { RoomPartyController } from './room-party.controller';

describe('RoomPartyController', () => {
  let controller: RoomPartyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomPartyController],
    }).compile();

    controller = module.get<RoomPartyController>(RoomPartyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
