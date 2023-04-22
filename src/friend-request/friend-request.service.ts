import { Injectable, Logger } from '@nestjs/common';
import { FriendRequestInfrastructure } from './friend-request.infrastructure';
import { User } from '../users/user.entity';
import { UsersInfrastructure } from '../users/user.infrastructure';

@Injectable()
export class FriendRequestService {
  private logger = new Logger(FriendRequestService.name);

  constructor(
    private friendRequestInfrastructure: FriendRequestInfrastructure,
    private userInfrastructure: UsersInfrastructure,
  ) {}

  async addFriendRequest(friendName: string, ownerName: string) {
    this.logger.log(`addFriendRequest: ${friendName}`);
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    const friend = await this.userInfrastructure.findOneBy(friendName);
    if (!friend) {
      throw new Error('Friend not found');
    }
    if (friend.id === ownerUser.id) {
      throw new Error('You cannot add yourself as a friend');
    }

    return this.friendRequestInfrastructure.addFriendRequest(friend, ownerUser);
  }

  async acceptFriendRequest(friendName: string, ownerName: string) {
    this.logger.log(`acceptFriendRequest: ${friendName}`);
    const friend = await this.userInfrastructure.findOneBy(friendName);
    if (!friend) {
      throw new Error('Friend not found');
    }
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    if (friend.id === ownerUser.id) {
      throw new Error('You cannot add yourself as a friend');
    }
    const friendRequest =
      await this.friendRequestInfrastructure.findReceiverAndSenderFriendRequests(
        ownerUser,
        friend,
      );
    if (!friendRequest) {
      throw new Error('Friend request not found');
    }
    return this.friendRequestInfrastructure.acceptFriendRequest(friendRequest);
  }

  async listSenderFriendRequest(ownerName: string) {
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    return this.friendRequestInfrastructure.listSenderFriendRequest(ownerUser);
  }

  async listReceiverFriendRequest(ownerName: string) {
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    this.logger.log(`listReceiverFriendRequest: ${ownerUser.username}`);
    return this.friendRequestInfrastructure.listReceiverFriendRequest(
      ownerUser,
    );
  }
}
