import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreateFavoriteDto,
  CreateFavoriteSchema,
} from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      const {
        data: { recipeId, userId },
      } = CreateFavoriteSchema.safeParse(createFavoriteDto);
      const existingFavorite = await this.findOne(recipeId, userId);

      if (existingFavorite && existingFavorite.profileId === userId)
        throw new ConflictException();

      return await this.prismaService.favorite.create({
        data: {
          profile: {
            connect: {
              id: userId,
            },
          },
          recipe: {
            connect: {
              id: recipeId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Favorite already exists');
      }
      throw new BadRequestException('Invalid data');
    }
  }

  async findAll() {
    return await this.prismaService.favorite.findMany();
  }

  async findOne(id: string, userId?: string) {
    return await this.prismaService.favorite.findFirst({
      where: {
        recipeId: id,
        ...(userId && { profileId: userId }),
      },
      include: {
        recipe: true,
      },
    });
  }

  async remove(id: string, authorId: string) {
    const existingFavorite = await this.findOne(id);
    if (existingFavorite && existingFavorite.profileId !== authorId)
      throw new ForbiddenException();

    return await this.prismaService.favorite.delete({
      where: {
        id,
      },
    });
  }
}
