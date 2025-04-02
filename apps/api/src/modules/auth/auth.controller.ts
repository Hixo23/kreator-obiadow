import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { RequestUser } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user

    const userLogin = await this.authService.login(user);
    res.cookie('token', userLogin.access_token, {
      httpOnly: true,
    });
    return res.json({ message: 'user logged in' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getUser(@Req() req: Request) {
    return await this.userService.findOne((req.user as unknown as RequestUser).email)
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/logout')
  async logout(@Res() res: Response) {
    res.cookie('token', '');
    return res.json({ message: 'user logged out' });
  }
}
