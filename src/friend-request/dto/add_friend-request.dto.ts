import { IsNotEmpty } from 'class-validator';

export class Add_friendRequestDto {
  @IsNotEmpty()
  friendName: string;
}
