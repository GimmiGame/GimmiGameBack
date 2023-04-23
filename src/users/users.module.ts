import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInfrastructure } from './user.infrastructure';
import { FriendRequestMapper } from '../friend-request/mapper/friend-request.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersInfrastructure, FriendRequestMapper],
  exports: [UsersService, UsersInfrastructure],
})
export class UsersModule {}
