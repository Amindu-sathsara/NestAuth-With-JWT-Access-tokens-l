
import { Controller,Get,Post,Body,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}   //inject the user service here
    @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;  // Return the users to the client
  }

  //create new user  
  @Post('create-newUser')
  create(@Body(ValidationPipe) createUserDto:CreateUserDto){
  return this.usersService.createUser(createUserDto);
}



  //get user details based on 


  
}
