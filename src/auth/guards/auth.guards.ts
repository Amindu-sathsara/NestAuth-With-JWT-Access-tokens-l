import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
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
