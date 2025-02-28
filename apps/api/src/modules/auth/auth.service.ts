import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, response: Response) {
    if (!loginDto.email || !loginDto.password) throw new BadRequestException();

    const user = await this.prismaService.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new NotFoundException();

    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const jwtToken = this.jwtService.sign(user);

    response.cookie('jwt_token', jwtToken, {
      httpOnly: true,
    });
    return response.json({ message: 'user logged in' });
  }
}
