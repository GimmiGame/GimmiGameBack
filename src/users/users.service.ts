import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UsersInfrastructure } from './user.infrastructure';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private userInfrastructure: UsersInfrastructure) {}

  async findOne(username: string): Promise<User | null> {
    return this.userInfrastructure.findOneBy(username);
  }
  async create(signUpDto: CreateUserDto): Promise<User> {
    return this.userInfrastructure.create(signUpDto);
  }
}
