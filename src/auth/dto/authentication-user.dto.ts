import { IsNotEmpty } from 'class-validator';

export class AuthenticationUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
