import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class RecipesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create({
    description,
    dietType,
    difficulty,
    ingredients,
    name,
    preparationProcess,
    file,
    authorId,
    preparationTime,
    servings,
  }: CreateRecipeDto & { file: Express.Multer.File }) {
    if (
      !description ||
      !dietType ||
      !difficulty ||
      !ingredients ||
      !name ||
      !preparationProcess ||
      !preparationTime ||
      !servings
    )
      throw new BadRequestException();

    const imageUpload = await this.cloudinaryService.uploadFile(file);
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

  async update(
    id: string,
    {
      authorId,
      description,
      dietType,
      difficulty,
      ingredients,
      name,
      preparationProcess,
    }: UpdateRecipeDto,
    file: Express.Multer.File,
  ) {
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
