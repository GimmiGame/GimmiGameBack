import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoomParty } from "./room-party.entity";
import { User } from "src/users/user.entity";

@Injectable()
export class RoomPartyInfrastructure {
    private logger = new Logger(RoomPartyInfrastructure.name);

    constructor(@InjectRepository(RoomParty) private roomRepository : Repository<RoomParty>) {}

    async createRoom(creator: User, gamePlayed: string, name: string) : Promise<RoomParty> {
        const createdRoom = new RoomParty();
        createdRoom.creator = creator;
        createdRoom.game = gamePlayed;
        createdRoom.name = name;
        createdRoom.gameStarted = false;
        createdRoom.terminated = false;
        createdRoom.saved = false;
        createdRoom.currentPlayers = [];
        createdRoom.winners = [];

        return await this.roomRepository.save(createdRoom);
    }

    async findRoomById(id : number) : Promise<RoomParty | null> {
        return this.roomRepository.findOneBy({id});
    }
}