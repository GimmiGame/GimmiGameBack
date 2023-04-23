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
            const roomParty =  this.roomPartyInfrastructure.createRoom(creator,gameName,gamePlayed)
            this.logger.log(`createRoom: ${(await roomParty).id} by: ${creatorUsername} with game: ${gamePlayed}`);
            return roomParty;
        }
    }

    async joinRoom(username : string, roomID : number) {
        const roomParty = await this.roomPartyInfrastructure.findRoomById(roomID);
        const user = await this.userInfrastructure.findOneBy(username);

        if(roomParty && user) {
            this.logger.log(`player ${username} joined room: ${roomID}`)
            roomParty.currentPlayers.push(user);
        }
    }

    async leaveRoom(username : string, roomID : number) {
        const roomParty = await this.roomPartyInfrastructure.findRoomById(roomID);
        const user = await this.userInfrastructure.findOneBy(username);

        if(roomParty && user) {
            this.logger.log(`player ${username} left room: ${roomID}`)
            const index = roomParty.currentPlayers.indexOf(user, 0);
            if (index > -1) {
                roomParty.currentPlayers.splice(index, 1);
            }
            if(roomParty.currentPlayers.length === 0) {
                this.logger.log(`the room: ${roomID} was closed because no player was left`)
                roomParty.terminated = true;
            }
        }
    }

    async saveRoom(username : string , roomID : number) {
        const roomParty = await this.roomPartyInfrastructure.findRoomById(roomID);
        const user = await this.userInfrastructure.findOneBy(username);

        if(roomParty && user) {
            this.logger.log(`player ${username} saved the room: ${roomID}`)
            roomParty.saved = true;
        }
    }

}
