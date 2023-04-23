import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UsersInfrastructure } from './user.infrastructure';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { FriendRequestMapper } from '../friend-request/mapper/friend-request.mapper';
import { Add_friendRequestDto } from '../friend-request/dto/add_friend-request.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    private userInfrastructure: UsersInfrastructure,
    private friendRequestMapper: FriendRequestMapper,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userInfrastructure.findOneBy(username);
  }
  async create(signUpDto: CreateUserDto): Promise<User> {
    return this.userInfrastructure.create(signUpDto);
  }

  async findOneByUsername(
    username: string,
  ): Promise<Add_friendRequestDto | null> {
    const user = await this.userInfrastructure.findOneBy(username);
    if (!user) {
      throw new Error('User not found');
    }
    return this.friendRequestMapper.mapperUserToFriendResponseDto(user);
  }
}
