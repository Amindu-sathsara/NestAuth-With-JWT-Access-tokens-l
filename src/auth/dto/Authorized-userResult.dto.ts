
import {IsNotEmpty} from 'class-validator';
export class AuthorizedUserResultDto {
    @IsNotEmpty()
    accessToken: string;

    @IsNotEmpty()
    userId: string;
    
    @IsNotEmpty()
    username: string;
  }

  
  //type AuthResult = { accessToken: string, userId: string, username: string };
