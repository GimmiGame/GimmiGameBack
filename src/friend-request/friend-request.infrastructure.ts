import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from './friend-request.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FriendRequestInfrastructure {
  private logger = new Logger(FriendRequestInfrastructure.name);

  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
  ) {}

  findAll(): Promise<FriendRequest[]> {
    return this.friendRequestRepository.find();
  }

  findOne(id: number): Promise<FriendRequest | null> {
    this.logger.log(`findOne: ${id}`);
    return this.friendRequestRepository.findOneBy({ id });
  }

  findOneByUsername(owner: User, friend: User): Promise<FriendRequest | null> {
    return this.friendRequestRepository.findOneBy({
      sender: owner,
      receiver: friend,
    });
  }

  async findReceiverAndSenderFriendRequests(
    receiver: User,
    sender: User,
  ): Promise<FriendRequest | null> {
    return await this.friendRequestRepository.findOneBy({
      receiver: receiver,
      sender: sender,
    });
  }

  async remove(id: number): Promise<void> {
    await this.friendRequestRepository.delete(id);
  }

  async addFriendRequest(
    friend: User,
    ownerUser: User,
  ): Promise<FriendRequest> {
    const createdFriendRequest = new FriendRequest();
    createdFriendRequest.sender = ownerUser;
    createdFriendRequest.receiver = friend;
    createdFriendRequest.sentAt = new Date();
    createdFriendRequest.accepted = false;
    return await this.friendRequestRepository.save(createdFriendRequest);
  }

  async acceptFriendRequest(
    friendRequest: FriendRequest,
  ): Promise<FriendRequest> {
    friendRequest.accepted = true;
    return await this.friendRequestRepository.save(friendRequest);
  }

  async listSenderFriendRequest(ownerUser: User): Promise<FriendRequest[]> {
    return await this.friendRequestRepository.find({
      where: { sender: ownerUser },
    });
  }

  async listReceiverFriendRequest(ownerUser: User): Promise<FriendRequest[]> {
    return await this.friendRequestRepository.find({
      where: { receiver: ownerUser },
    });
  }
}
