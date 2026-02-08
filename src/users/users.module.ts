import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // підключаємо сутність User
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService] // щоб можна було використовувати UsersService в інших модулях
})
export class UsersModule { }