import { Injectable, Logger } from '@nestjs/common';
import { RoomPartyInfrastructure } from './room-party.infrastructure';
import { UsersInfrastructure } from 'src/users/user.infrastructure';

@Injectable()
export class RoomPartyService {
    private logger = new Logger(RoomPartyService.name);

    constructor(private roomPartyInfrastructure : RoomPartyInfrastructure, private userInfrastructure: UsersInfrastructure) {}
    
    async createRoom(creatorUsername : string, gameName : string, gamePlayed : string) {

        const creator = await this.userInfrastructure.findOneBy(creatorUsername);

        if(creator) {
            return this.roomPartyInfrastructure.createRoom(creator,gameName,gamePlayed)
        }
    }

    async joinRoom(username : string, roomID : number) {
        const roomParty = await this.roomPartyInfrastructure.findRoomById(roomID);
        const user = await this.userInfrastructure.findOneBy(username);

        if(roomParty && user) {
            roomParty.currentPlayers.push(user);
        }
    }

    async leaveRoom(username : string, roomID : number) {
        const roomParty = await this.roomPartyInfrastructure.findRoomById(roomID);
        const user = await this.userInfrastructure.findOneBy(username);

        if(roomParty && user) {
            const index = roomParty.currentPlayers.indexOf(user, 0);
            if (index > -1) {
                roomParty.currentPlayers.splice(index, 1);
            }
            if(roomParty.currentPlayers.length === 0) {
                roomParty.terminated = true;
            }
        }
    }

    async saveRoom(username : string , roomID : number) {
        const roomParty = await this.roomPartyInfrastructure.findRoomById(roomID);
        const user = await this.userInfrastructure.findOneBy(username);

        if(roomParty && user) {
            roomParty.saved = true;
        }
    }

}
