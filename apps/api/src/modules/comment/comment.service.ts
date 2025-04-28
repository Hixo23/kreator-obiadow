import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCommentDto,
  CreateCommentSchema,
} from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateCommentDto) {
    try {
      const {
        data: { content, rating, authorId, recipeId },
      } = CreateCommentSchema.safeParse(data);
      const comment = await this.prismaService.comment.create({
        data: {
          content,
          rating,
          author: {
            connect: {
              userId: authorId,
            },
          },
          recipe: {
            connect: {
              id: recipeId,
            },
          },
        },
      });

      return comment;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.formErrors.fieldErrors);
      }
      throw new BadRequestException('Invalid data');
    }
  }

  async findOne(id: string) {
    const comment = await this.prismaService.comment.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    return comment;
  }

  async findAll(id: string) {
    const comments = await this.prismaService.comment.findMany({
      where: {
        recipeId: id,
      },
      include: {
        author: true,
      },
    });

    return comments;
  }

  async update(id: string, { rating, content }: CreateCommentDto) {
    const commentExists = await this.findOne(id);

    if (!commentExists) throw new NotFoundException();
    const updatedComment = await this.prismaService.comment.update({
      where: {
        id,
      },
      data: {
        content,
        rating,
      },
    });

    if (!updatedComment) throw new InternalServerErrorException();

    return updatedComment;
  }

  async remove(id: string) {
    const commentExists = await this.findOne(id);

    if (!commentExists) throw new NotFoundException();
    await this.prismaService.comment.delete({
      where: {
        id,
      },
    });

    return { message: 'comment deleted' };
  }
}
