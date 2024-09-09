
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];  // Extract JWT from the Authorization header
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);  // Verify and decode the token
      console.log('JWT Payload:', payload);  // Log the payload to check if `sub` is correct
      request.user = payload;  // Attach decoded payload to the request object
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}




/*import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        // Check if the authorization header is present
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];

        // Check if the token is present
        if (!token) {
            throw new UnauthorizedException('Token is missing from the Authorization header');
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token); 
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username
            };
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
*/