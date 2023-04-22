import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  sender: User;
  @OneToOne(() => User)
  @JoinColumn()
  receiver: User;
  @Column()
  sentAt: Date;
  @Column()
  accepted: boolean;
}
