import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser({ email, password }: LoginDto) {
    if (!email || !password) throw new BadRequestException("Brakuje danych");

    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
      include: {
        profile: {
          include: {
            comments: true,
            recipes: true
          }
        }
      }
    });

    if (!user) throw new NotFoundException("Nie znaleziono użytkownika z takim mailem!");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new UnauthorizedException("Błędne dane");

    return user;
  }

  async login(user: RequestUser) {
    const mappedUser = this.mapUser(user);

    return {
      access_token: this.jwtService.sign(mappedUser),
    };
  }

  mapUser(user: RequestUser) {
    return {
      role: user.role,
      email: user.email,
      id: user.id,
      profile: {
        id: user.profile.id,
        username: user.profile.username,
        recipes: user.profile.recipes,
        comments: user.profile.comments
      }
    };
  }
}
