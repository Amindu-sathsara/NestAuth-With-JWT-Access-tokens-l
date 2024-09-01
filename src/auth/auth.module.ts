import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configs/jwt-secret';

@Module({
   // Import UsersModule
  providers: [AuthService], // Provide AuthService
  controllers: [AuthController],
  imports: [
    UsersModule,
  JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '10m' },

  })
]
})  //Now I have configured that jwt service in our auth module
export class AuthModule {} 
