import { Controller,Post,Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() input:{username:string, password:string}){
        const checkUser=await this.authService.authenticateUser(input);
        return checkUser;

}
}