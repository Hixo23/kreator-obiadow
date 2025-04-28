import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RequestUser } from 'src/types';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    const user = req.user as unknown as RequestUser;
    return this.commentService.create({
      ...createCommentDto,
      authorId: user.id,
    });
  }

  @Get(':recipeId')
  findAll(@Param('recipeId') recipeId: string) {
    return this.commentService.findAll(recipeId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const user = req.user as unknown as RequestUser;
    return this.commentService.update(id, {
      ...updateCommentDto,
      authorId: user.id,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
