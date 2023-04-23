import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import {JoinTable} from "typeorm";

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
  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];
}
