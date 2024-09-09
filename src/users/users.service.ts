import { UsersModule } from 'src/users/users.module';
import { Injectable } from '@nestjs/common';
import { UsersController } from './users.controller';
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

    //get all users
    async findAll(): Promise<User[]> {
        return users;
      }
    async findUserByName(name:string):Promise<User> {
        return users.find(user => user.username === name);
    
}
    //newly added method for the getting user details based on users  : userId
    async findUserById(userId: string): Promise<User | undefined> {
        return users.find(user => user.userId === userId);
        
    }

}

