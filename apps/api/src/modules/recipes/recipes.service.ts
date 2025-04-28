import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto, CreateRecipeSchema } from './dto/create-recipe.dto';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { z } from 'zod';

@Injectable()
export class RecipesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(data: CreateRecipeDto & { file: Express.Multer.File }) {
    try {
      const {
        data: {
          description,
          dietType,
          difficulty,
          ingredients,
          name,
          preparationProcess,
          authorId,
          preparationTime,
          servings,
        },
      } = CreateRecipeSchema.safeParse(data);
      const imageUpload = await this.cloudinaryService.uploadFile(data.file);
      if (imageUpload.error) throw new InternalServerErrorException();

      const recipe = await this.prismaService.recipe.create({
        data: {
          description,
          dietType,
          difficulty,
          imageUrl: imageUpload.url,
          ingredients,
          name,
          preparationProcess,
          preparationTime: +preparationTime,
          servings: +servings,
          author: {
            connect: {
              userId: authorId,
            },
          },
        },
      });

      return recipe;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.formErrors.fieldErrors);
      }
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(
          'Błąd podczas przesyłania pliku',
        );
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Nie znaleziono przepisu');
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(
          'Nie masz uprawnień do edytowania tego przepisu',
        );
      }
    }
  }

  async findAll() {
    return await this.prismaService.recipe.findMany();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException();

    return await this.prismaService.recipe.findFirst({
      where: {
        id,
      },
    });
  }

  async findByUser(userId: string) {
    if (!userId) throw new BadRequestException();

    return await this.prismaService.recipe.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async update(id: string, data: CreateRecipeDto, file: Express.Multer.File) {
    try {
      const {
        data: {
          description,
          dietType,
          difficulty,
          ingredients,
          name,
          preparationProcess,
          authorId,
        },
      } = CreateRecipeSchema.safeParse(data);
      const isRecipeExists = await this.findOne(id);

      if (!isRecipeExists) throw new NotFoundException();

      if (isRecipeExists.authorId !== authorId)
        throw new ForbiddenException('Ten przepis nie należy do ciebie');
      if (file) {
        const imageUpload = await this.cloudinaryService.uploadFile(file);
        if (imageUpload.error) throw new InternalServerErrorException();
        return await this.prismaService.recipe.update({
          where: {
            id,
            authorId,
          },
          data: {
            imageUrl: imageUpload.url,
          },
        });
      }

      const updatedRecipe = await this.prismaService.recipe.update({
        where: {
          id: id,
          authorId,
        },
        data: {
          description,
          dietType,
          difficulty,
          ingredients,
          name,
          preparationProcess,
        },
      });
      return updatedRecipe;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.formErrors.fieldErrors);
      }
    }
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException();

    return await this.prismaService.recipe.delete({
      where: {
        id,
      },
    });
  }
}
