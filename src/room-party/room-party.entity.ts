import { User } from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomParty {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    game : string;

    @ManyToMany(() => User)
    @JoinTable()
    currentPlayers : User[];

    @ManyToOne(() => User, user => user.createdRooms)
    creator : User;

    @Column()
    gameStarted : boolean;

    @Column()
    terminated : boolean;

    @Column()
    saved : boolean;

    @ManyToMany(() => User, {nullable: true})
    @JoinTable()
    winners : User[];

}