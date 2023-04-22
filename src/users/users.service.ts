import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UsersInfrastructure } from './user.infrastructure';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private userInfrastructure: UsersInfrastructure) {}

  async findOne(username: string): Promise<User | null> {
    return this.userInfrastructure.findOneBy(username);
  }
  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    return this.userInfrastructure.create(username, password, email);
  }
}
