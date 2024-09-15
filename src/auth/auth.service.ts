/*import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';   //addded new
import { SignInUserDto } from './dto/SingInUserData.dto';   //addded new
import { AuthorizedUserResultDto } from './dto/Authorized-userResult.dto';

//type AuthInput = { username: string, password: string };
//type SignInData = { userId: number, username: string };
//type AuthResult = { accessToken: string, userId: number, username: string };


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(loginUserDto: LoginUserDto): Promise<SignInUserDto | null> {
        const user = await this.userService.findUserByName(loginUserDto.username);  // Use `findUserByName`

        if (user && user.password === loginUserDto.password) { // Replace with bcrypt comparison for security
            return {
                userId: user.userId,
                username: user.username,
            };
        }
        return null;
    }

    async authenticateUser(loginUserDto: LoginUserDto): Promise<AuthorizedUserResultDto> {
        const user = await this.validateUser(loginUserDto);

        if (!user) {
            throw new UnauthorizedException('The given username or password does not match any user in this platform');
        }

        return this.generateAuthResult(user);
    }

    async generateAuthResult(user: SignInUserDto): Promise<AuthorizedUserResultDto> {
        const tokenPayloadData = {
          sub: user.userId,  // Ensure this is the correct userId
          username: user.username
        };
      
        const accessToken = await this.jwtService.signAsync(tokenPayloadData);
        return { accessToken, userId: user.userId, username: user.username };
      }
      

    // Protected API for fetching full user details based on userId
    async getUserDetails(userId: string): Promise<any> {
        const user = await this.userService.findUserById(userId);

        if (!user) {
            throw new UnauthorizedException('User with userId ${userId} not found ');
        }

        return user;  // Returning full user details
    }
}
*/



//second attempt

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignInUserDto } from './dto/SingInUserData.dto';   //addded new
import { AuthorizedUserResultDto } from './dto/Authorized-userResult.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  // Validate the user (direct password comparison)
  async validateUser(loginUserDto: LoginUserDto): Promise<SignInUserDto | null> {
    const user = await this.userService.findUserByName(loginUserDto.username);  // Find user by username

    if (user && user.password === loginUserDto.password) {  // Direct password comparison
      return {
        userId: user.id,  // MongoDB ObjectId
        username: user.username,
      };
    }
    return null;
  }

  async authenticateUser(loginUserDto: LoginUserDto): Promise<AuthorizedUserResultDto> {
    const user = await this.validateUser(loginUserDto);

    if (!user) {
      throw new UnauthorizedException('The given username or password does not match any user in this platform');
    }

    return this.generateAuthResult(user);
  }

  async generateAuthResult(user: SignInUserDto): Promise<AuthorizedUserResultDto> {
    const tokenPayloadData = {
      sub: user.userId,  // MongoDB ObjectId
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayloadData);
    return { accessToken, userId: user.userId, username: user.username };
  }

  // Protected API for fetching full user details based on userId
  async getUserDetails(userId: string): Promise<any> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException(`User with userId ${userId} not found`);
    }

    return user;  // Returning full user details
  }
}
