import { Controller, Logger, Post, UseGuards, Request, Body, Param, } from '@nestjs/common';
import { RoomPartyService } from './room-party.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRoomDTO } from './dto/create-room-request.dto';
import { AuthenticatedRequest } from 'src/interface/authenticated_request';

@Controller('room-party')
export class RoomPartyController {
    private logger = new Logger(RoomPartyController.name);
    constructor(private roomPartyService : RoomPartyService) {}

    @UseGuards(AuthGuard)
    @Post('create')
    createRoom(@Request() req: AuthenticatedRequest, @Body() createRoomDTO : CreateRoomDTO) {
        this.roomPartyService.createRoom(req.user.username, createRoomDTO.gameName, createRoomDTO.gamePlayed);
    }

    @UseGuards(AuthGuard)
    @Post('join:id')
    joinRoom(@Request() req: AuthenticatedRequest, @Param('id') id : number) {
        this.roomPartyService.joinRoom(req.user.username, id);
    }
}
