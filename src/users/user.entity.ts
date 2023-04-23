import { RoomParty } from 'src/room-party/room-party.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  active: boolean;
  @ManyToMany(() => User, (user) => user.friends)
  friends: User[];

  @ManyToMany(() => RoomParty, roomParty => roomParty.currentPlayers, {nullable: true})
  currentRooms : RoomParty[];

  @OneToMany(() => RoomParty, roomParty => roomParty.creator)
  createdRooms : RoomParty[];
}
