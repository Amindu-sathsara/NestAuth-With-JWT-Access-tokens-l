import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
; // Assuming the DTO is placed in the `users/dto/` folder
import { AuthGuard } from './guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login endpoint
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const checkUser = await this.authService.authenticateUser(loginUserDto);
    if (!checkUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return checkUser;
  }

  // Register endpoint
 /* @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // You can hash the password here or handle it in the service
    const newUser = await this.authService.registerUser(createUserDto);
    return newUser;
  }
*/
  // Protected endpoint to get user details
  @UseGuards(AuthGuard)
  @Get('user-details')
  async getUserDetails(@Request() request) {
    return request.user; // JWT payload should include user details
  }
}