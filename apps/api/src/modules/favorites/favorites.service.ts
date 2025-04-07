import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    if (!createFavoriteDto.recipeId || !createFavoriteDto.userId)
      throw new BadRequestException();

    const existingFavorite = await this.findOne(
      createFavoriteDto.recipeId,
      createFavoriteDto.userId,
    );

    if (
      existingFavorite &&
      existingFavorite.profileId === createFavoriteDto.userId
    )
      throw new ConflictException();

    return await this.prismaService.favorite.create({
      data: {
        profile: {
          connect: {
            id: createFavoriteDto.userId,
          },
        },
        recipe: {
          connect: {
            id: createFavoriteDto.recipeId,
          },
        },
      },
    });
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
