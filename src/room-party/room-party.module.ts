import { Module } from '@nestjs/common';
import { RoomPartyService } from './room-party.service';
import { RoomPartyController } from './room-party.controller';

@Module({
  providers: [RoomPartyService],
  controllers: [RoomPartyController]
})
export class RoomPartyModule {}
