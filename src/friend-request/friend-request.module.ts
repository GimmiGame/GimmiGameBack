import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './friend-request.entity';
import { FriendRequestInfrastructure } from './friend-request.infrastructure';
import { UsersInfrastructure } from '../users/user.infrastructure';
import { User } from '../users/user.entity';
import { FriendRequestMapper } from './mapper/friend-request.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    FriendRequestService,
    FriendRequestMapper,
    FriendRequestInfrastructure,
    UsersInfrastructure,
  ],
  controllers: [FriendRequestController],
  exports: [
    FriendRequestService,
    FriendRequestInfrastructure,
    FriendRequestMapper,
  ],
})
export class FriendRequestModule {}
