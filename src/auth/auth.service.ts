import {
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationUserDto } from './dto/authentication-user.dto';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: AuthenticationUserDto): Promise<any> {
    this.logger.log(`signIn: ${signInDto.username}`);
    const user = await this.usersService.findOne(signInDto.username);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(signUpDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOne(signUpDto.username);
    if (user) {
      throw new UnauthorizedException();
    }
    const bcryptPassword = await this.buildBcryptPassword(signUpDto.password);
    const userDao = new CreateUserDto();
    userDao.username = signUpDto.username;
    userDao.password = bcryptPassword;
    userDao.email = signUpDto.email;
    const userCreated = await this.usersService.create(userDao);
    const payload = { username: userCreated.username, sub: userCreated.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async buildBcryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
