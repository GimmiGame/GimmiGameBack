import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    this.logger.log(`signIn: ${username}`);
    const bcryptPassword = await this.buildBcryptPassword(pass);
    const user = await this.usersService.findOne(username);
    if (user?.password !== bcryptPassword) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(username: string, pass: string): Promise<any> {
    this.logger.log(`signUp: ${username}`);
    const user = await this.usersService.findOne(username);
    if (user) {
      throw new UnauthorizedException();
    }
    const bcryptPassword = await this.buildBcryptPassword(pass);
    const userCreated = await this.usersService.create(
      username,
      bcryptPassword,
    );
    const payload = { username: userCreated.username, sub: userCreated._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async buildBcryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
