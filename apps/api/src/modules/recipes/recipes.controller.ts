import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ParseFilePipeBuilder,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from 'src/types';
import { CurrentUser } from '../user/user.decorator';

@Controller('recipe')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: RequestUser,
  ) {
    return this.recipesService.create({
      ...createRecipeDto,
      file,
      authorId: user.id,
    });
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.recipesService.findByUser(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: CreateRecipeDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: RequestUser,
  ) {
    return this.recipesService.update(
      id,
      { ...updateRecipeDto, authorId: user.profile.id },
      file,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
