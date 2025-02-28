import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  providers: [AuthService, PrismaService, UserService],
  controllers: [AuthController],
  imports: [JwtModule.register({ secret: 'dasdsadasdas' })],
})
export class AuthModule {}
