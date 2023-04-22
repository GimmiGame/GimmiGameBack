import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { User } from '../users/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationUserDto } from './dto/authentication-user.dto';
import { AuthenticatedRequest } from '../interface/authenticated_request';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'identify with an account already created' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'connected and it returns a token ',
  })
  signIn(@Body() signInDto: AuthenticationUserDto) {
    return this.authService.signIn(signInDto);
  }
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() request: AuthenticatedRequest): string {
    return request.user.username;
  }

  @Public()
  @Get()
  findAll() {
    return [];
  }
}
