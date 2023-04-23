import { FriendResponseDto } from '../dto/friend-response.dto';
import { User } from '../../users/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendRequestMapper {
  mapperUserToFriendResponseDto(user: User): FriendResponseDto {
    const friendResponseDto = new FriendResponseDto();
    friendResponseDto.friendName = user.username;
    friendResponseDto.email = user.email;
    return friendResponseDto;
  }

  mapperUsersToFriendResponseDto(users: User[]): FriendResponseDto[] {
    return users.map((user) => this.mapperUserToFriendResponseDto(user));
  }
}
