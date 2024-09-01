import { UsersModule } from 'src/users/users.module';
import { Injectable } from '@nestjs/common';
import { UsersController } from './users.controller';
type User={
    userId:number;
    username:string;
    password:string;

}
// add mock data to users . later this shuold be work with the actual database 

const users:User[] = [
    {userId:1, username:"Amindu Sathsara", password:"Amiya"},  //Later I should pass the hash password to the database not the actual database 
    {userId:2, username:"Suneethan", password:"NonaAkka"},
    {userId:3, username:"Nagasinghe", password:"Aariyapala "}
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


}

