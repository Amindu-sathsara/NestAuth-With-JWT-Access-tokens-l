
import {IsNotEmpty,IsString} from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    contactNo: string;

    @IsNotEmpty()
    @IsString()
    parentNic: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;


  }
  


  