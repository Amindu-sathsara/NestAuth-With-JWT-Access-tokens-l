import { CreateUserDto } from "./create-user.dto";
import {PartialType} from "@nestjs/mapped-types";   //before this run this command   :npm i @nestjs/mapped-types -D                                                             

// using PartialType  instead of creating upadate-user.dto.ts seperately we can use the extends method because the nestjs also work with js class basically

export class UpdateUserDto extends PartialType(CreateUserDto){}

