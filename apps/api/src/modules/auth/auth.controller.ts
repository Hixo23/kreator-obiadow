import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('/login')
  async login(@Body() body: LoginDto, @Res() response: Response) {
    return await this.authService.login(body, response);
  }

  @Post('/register')
  async Register(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
