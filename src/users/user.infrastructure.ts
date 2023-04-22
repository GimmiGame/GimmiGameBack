import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    this.logger.log(`create: ${username}, ${password}`);
    const createdUser = new User();
    createdUser.username = username;
    createdUser.password = password;
    createdUser.email = email;
    createdUser.active = false;
    return await this.usersRepository.save(createdUser);
  }
}
