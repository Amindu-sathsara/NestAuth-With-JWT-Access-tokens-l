import { Controller,Post,Get,Body, HttpCode,Request, HttpStatus,UseGuards ,NotImplementedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() input:{username:string, password:string}){
        const checkUser=await this.authService.authenticateUser(input);
        return checkUser;

}
        
    
    @UseGuards(AuthGuard)
    @Get('DetailOfOneUser')
    async getUserDetail(@Request() request){
        //throw new NotImplementedException("Getting user end point still not connect with partcular service method");
        return request.user;
    }

}