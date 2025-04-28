import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/user.decorator';
import { RequestUser } from 'src/types';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.favoritesService.create({
      ...createFavoriteDto,
      userId: user.profile.id,
    });
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.favoritesService.findOne(id, user.profile.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.favoritesService.remove(id, user.profile.id);
  }
}
