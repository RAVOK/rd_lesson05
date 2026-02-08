import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ResponseDTO } from './dto/response.dto'; // якщо є DTO

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<ResponseDTO<User>> {
    const users = await this.usersService.getAllUsers();
    return new ResponseDTO<User>(users, 0, '');
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ResponseDTO<User>> {
    const user = await this.usersService.getUserById(id);
    return new ResponseDTO<User>(user ? [user] : [], 0, '');
  }
}