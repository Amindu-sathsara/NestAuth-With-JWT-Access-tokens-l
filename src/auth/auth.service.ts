import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { username: string, password: string };
type SignInData = { userId: number, username: string };
type AuthResult = { accessToken: string, userId: number, username: string };

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.username);

        if (user && user.password === input.password) { // Replace with bcrypt comparison
            return {
                userId: user.userId,
                username: user.username,
            };
        }
        return null;
    }

    async authenticateUser(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if (!user) {
            throw new UnauthorizedException('The given username or password does not match any user in this platform');
        }

        return this.generateAuthResult(user);
    }

    async generateAuthResult(user: SignInData): Promise<AuthResult> {
        const tokenPayloadData = {
            sub: user.userId,
            username: user.username
        };

        const accessToken = await this.jwtService.signAsync(tokenPayloadData);
        return { accessToken, userId: user.userId, username: user.username };
    }
}
