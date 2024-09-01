
import { Controller,Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}   //inject the user service here
    @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;  // Return the users to the client
  }
}
