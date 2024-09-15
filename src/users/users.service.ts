/*import { UsersModule } from 'src/users/users.module';
import { Injectable } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma} from '@prisma/client';  // Import Prisma and User model
import { CreateUserDto } from './dto/create-user.dto';
type User={
    userId:string;
    username:string;
    password:string;
    email:string;
    contactNo :string;
    nicNo:string;

}
// add mock data to users . later this shuold be work with the actual database 

const users:User[] = [
    {userId:'1', username:"Amindu Sathsara", password:"Amiya",email:"amindu@a.com",contactNo:"0712345678",nicNo:"123456789V"},  //Later I should pass the hash password to the database not the actual database 
    {userId:'2', username:"Shehan Sanjula", password:"NonaAkka",email:"binoj@b.com",contactNo:"0712345678",nicNo:"123456789V"},
    {userId:'3', username:"Theeksha rathnyaka", password:"Aariyapala ",email:"aariya@a.com",contactNo:"0712345678",nicNo:"123456789V"}
]
@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    //get all users from that already in cloud database
    async findAll(): Promise<any> {
        //return users;
        const users=await this.prisma.users.findMany();
        return users;
        
      }
    async findUserByName(name:string):Promise<User> {
        return users.find(user => user.username === name);
    
}
    //newly added method for the getting user details based on users  : userId
    async findUserById(userId: string): Promise<User | undefined> {
        return users.find(user => user.userId === userId);
        
    }

    async create(createUserDto: CreateUserDto) {
        try {
          // Check if user with the same userName already exists
          const existingUser = await this.prisma.users.findUnique({
            where: { username: createUserDto.username },
          });
      
          if (existingUser) {
            throw new Error('User with this username already exists.');
          }
      
          // Create the new user if no duplicate is found
          return await this.prisma.users.create({
            data: createUserDto,
          });
        } catch (error) {
          // Log the error and throw a specific error message
          console.error('Error creating user:', error.message || error);
          throw new Error(error.message || 'With the provided info You can not create the user');
        }
      }
      

}*/



//second attemp

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //get all users from that already in cloud database
  async findAll(): Promise<any> {
    //return users;
    const users=await this.prisma.users.findMany();
    return users;
    
  }


  // Find a user by username
  async findUserByName(username: string) {
    return this.prisma.users.findUnique({
      where: { username },  // Search user by username
    });
  }

  // Find a user by their id (for protected APIs)
  async findUserById(userId: string) {
    return this.prisma.users.findUnique({
      where: { id: userId },  // Search user by MongoDB ObjectId
    });
  }

  // Register a new user
  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        contactNo: createUserDto.contactNo,
        parentNic: createUserDto.parentNic,
        username: createUserDto.username,
        password: createUserDto.password,  // Directly saving the password (no hashing)
      },
    });
  }
}


