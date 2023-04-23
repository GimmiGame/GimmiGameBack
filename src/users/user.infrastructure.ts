import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersInfrastructure {
  private logger = new Logger(UsersInfrastructure.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    this.logger.log(`findOne: ${id}`);
    return this.usersRepository.findOneBy({ id });
  }

  findOneBy(username: string): Promise<User | null> {
    this.logger.log(`findOneBy: ${username}`);
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(signUpDto: CreateUserDto): Promise<User> {
    const createdUser = new User();
    createdUser.username = signUpDto.username;
    createdUser.password = signUpDto.password;
    createdUser.email = signUpDto.email;
    createdUser.active = false;
    return await this.usersRepository.save(createdUser);
  }

  async addFriend(friend: User, owner: User): Promise<void> {
    this.logger.log(`owner: ${owner.friends}`);
    if (owner.friends === undefined) {
      owner.friends = [friend];
    } else {
      owner.friends.push(friend);
    }
    await this.usersRepository.save(owner);
  }

  async removeFriend(friend: User, owner: User): Promise<void> {
    owner.friends = owner.friends.filter((f) => f.id !== friend.id);
    await this.usersRepository.save(owner);
  }

  async findAllFriends(owner: User): Promise<User[]> {
    return await this.usersRepository.find({
      where: { id: owner.id },
      relations: ['friends'],
    });
  }

  async friendshipAccepted(owner: User, friend: User): Promise<boolean> {
    const ownerFriends = await this.findAllFriends(owner);
    return ownerFriends.some((f) => f.id === friend.id);
  }
}
