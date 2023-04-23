import { Injectable, Logger } from '@nestjs/common';
import { FriendRequestInfrastructure } from './friend-request.infrastructure';
import { User } from '../users/user.entity';
import { UsersInfrastructure } from '../users/user.infrastructure';
import { FriendRequestMapper } from './mapper/friend-request.mapper';

@Injectable()
export class FriendRequestService {
  private logger = new Logger(FriendRequestService.name);

  constructor(
    private friendRequestInfrastructure: FriendRequestInfrastructure,
    private userInfrastructure: UsersInfrastructure,
    private friendRequestMapper: FriendRequestMapper,
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
    const alreadyFriendRequest = await this.verifyFriendRequestAlready(
      ownerUser,
      friend,
    );
    if (!alreadyFriendRequest) {
      throw new Error('Friend request already sent');
    }
    const alreadyFriend = await this.userInfrastructure.friendshipAccepted(
      ownerUser,
      friend,
    );
    if (alreadyFriend) {
      throw new Error('Already friend');
    }
    await this.friendRequestInfrastructure.addFriendRequest(friend, ownerUser);
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
    const alreadyFriend = await this.userInfrastructure.friendshipAccepted(
      ownerUser,
      friend,
    );
    if (alreadyFriend) {
      throw new Error('Already friend');
    }
    await this.userInfrastructure.addFriend(friend, ownerUser);
    await this.friendRequestInfrastructure.acceptFriendRequest(friendRequest);
  }

  async listSenderFriendRequest(ownerName: string) {
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    const resultFriendRequest =
      await this.friendRequestInfrastructure.listSenderFriendRequest(ownerUser);
    return resultFriendRequest.filter(
      (friendRequest) => !friendRequest.accepted,
    );
  }

  async listReceiverFriendRequest(ownerName: string) {
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    this.logger.log(`listReceiverFriendRequest: ${ownerUser.username}`);
    const resultFriendRequest =
      await this.friendRequestInfrastructure.listReceiverFriendRequest(
        ownerUser,
      );
    return resultFriendRequest.filter(
      (friendRequest) => !friendRequest.accepted,
    );
  }

  async verifyFriendRequestAlready(userOwner: User, userFriend: User) {
    const friendRequest =
      await this.friendRequestInfrastructure.findReceiverAndSenderFriendRequests(
        userOwner,
        userFriend,
      );
    if (friendRequest) {
      return false;
    }
    const friendRequest2 =
      await this.friendRequestInfrastructure.findReceiverAndSenderFriendRequests(
        userFriend,
        userOwner,
      );
    if (friendRequest2) {
      return false;
    }
    return true;
  }

  async listAllFriends(ownerName: string) {
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    const resultFriendRequest = await this.userInfrastructure.findAllFriends(
      ownerUser,
    );
    return resultFriendRequest.map((friend) =>
      this.friendRequestMapper.mapperUserToFriendResponseDto(friend),
    );
  }

  async removeFriend(friendName: string, ownerName: string) {
    const ownerUser = await this.userInfrastructure.findOneBy(ownerName);
    if (!ownerUser) {
      throw new Error('Owner not found');
    }
    const friend = await this.userInfrastructure.findOneBy(friendName);
    if (!friend) {
      throw new Error('Friend not found');
    }
    await this.userInfrastructure.removeFriend(ownerUser, friend);
  }
}
