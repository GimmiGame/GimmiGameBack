import {Injectable, Logger} from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async findOne(username: string): Promise<UserDocument | null> {
    const user = await this.model.findOne({ username }).exec();
    return user ? user : null;
  }
  async create(username: string, password: string): Promise<UserDocument> {
    this.logger.log(`create: ${username}, ${password}`);
    const createdUser = new this.model({ username, password });
    return await createdUser.save();
  }
}
