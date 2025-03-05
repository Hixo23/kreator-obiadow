import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) { }
  async create({ authorId, content, rating, recipeId }: CreateCommentDto) {
    if (!authorId || !content || !rating || !recipeId) throw new BadRequestException();
    const comment = await this.prismaService.comment.create({
      data: {
        content,
        rating,
        author: {
          connect: {
            id: authorId
          }
        },
        recipe: {
          connect: {
            id: recipeId
          }
        }
      }
    })

    return comment;
  }

  async findAll(id: string) {
    const comments = await this.prismaService.comment.findMany({
      where: {
        recipeId: id
      }
    })

    return comments;
  }


  async update(id: string, { rating, content }: UpdateCommentDto) {
    const updatedComment = await this.prismaService.comment.update({
      where: {
        id
      },
      data: {
        content,
        rating
      }
    })

    if (!updatedComment) throw new InternalServerErrorException();

    return updatedComment;
  }

  async remove(id: string) {
    await this.prismaService.comment.delete({
      where: {
        id
      }
    })

    return { message: "comment deleted" }
  }
}
