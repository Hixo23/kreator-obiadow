import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { constants } from './auth.constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [
    AuthService,
    PrismaService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [JwtModule.register({ secret: constants.jwtSecret })],
})
export class AuthModule {}
