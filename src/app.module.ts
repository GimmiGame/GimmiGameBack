import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { FriendRequest } from './friend-request/friend-request.entity';
import { RoomPartyModule } from './room-party/room-party.module';
import { RoomParty } from './room-party/room-party.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      entities: [User, FriendRequest, RoomParty],
      username: 'postgres',
      password: 'postgres',
      database: 'game',
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    FriendRequestModule,
    RoomPartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
