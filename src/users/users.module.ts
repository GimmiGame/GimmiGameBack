import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInfrastructure } from './user.infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersInfrastructure],
  exports: [UsersService, UsersInfrastructure],
})
export class UsersModule {}
