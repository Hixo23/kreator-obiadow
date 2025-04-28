import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/user.decorator';
import { RequestUser } from 'src/types';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.profileService.update(user.profile.id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
