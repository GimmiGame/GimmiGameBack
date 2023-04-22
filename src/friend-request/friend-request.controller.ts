import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { AuthGuard } from '../auth/auth.guard';
import { Add_friendRequestDto } from './dto/add_friend-request.dto';
import { AuthenticatedRequest } from '../interface/authenticated_request';

@Controller('friend-request')
export class FriendRequestController {
  private logger = new Logger(FriendRequestController.name);
  constructor(private friendRequestService: FriendRequestService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  addFriendRequest(
    @Request() req: AuthenticatedRequest,
    @Body() addFriendRequestDto: Add_friendRequestDto,
  ) {
    return this.friendRequestService.addFriendRequest(
      addFriendRequestDto.friendName,
      req.user.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('accept')
  acceptFriendRequest(
    @Request() req: AuthenticatedRequest,
    @Body() acceptFriendRequestDto: Add_friendRequestDto,
  ) {
    return this.friendRequestService.acceptFriendRequest(
      acceptFriendRequestDto.friendName,
      req.user.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('listsender')
  listSenderFriendRequest(@Request() req: AuthenticatedRequest) {
    this.logger.log(`listSenderFriendRequest: ${req.user.username}`);
    return this.friendRequestService.listSenderFriendRequest(req.user.username);
  }

  @UseGuards(AuthGuard)
  @Post('listreceiver')
  listReceiverFriendRequest(@Request() req: AuthenticatedRequest) {
    return this.friendRequestService.listReceiverFriendRequest(
      req.user.username,
    );
  }
}
