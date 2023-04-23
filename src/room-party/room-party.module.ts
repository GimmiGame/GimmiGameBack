import { Module } from '@nestjs/common';
import { RoomPartyController } from './room-party.controller';
import { RoomPartyService } from './room-party.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomParty } from './room-party.entity';
import { User } from 'src/users/user.entity';
import { RoomPartyInfrastructure } from './room-party.infrastructure';
import { UsersInfrastructure } from 'src/users/user.infrastructure';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([RoomParty]),
    TypeOrmModule.forFeature([User]),
    UsersModule
    ],
  controllers: [RoomPartyController],
  providers: [RoomPartyService, RoomPartyInfrastructure, UsersInfrastructure],
  exports: [RoomPartyService, RoomPartyInfrastructure]
})
export class RoomPartyModule {}
