import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [PrismaService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
