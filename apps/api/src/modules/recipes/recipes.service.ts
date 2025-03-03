import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UTApi } from 'uploadthing/server';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma.service';
import { uploadRouter } from 'src/utils/uploadThing';

@Injectable()
export class RecipesService {
  private utApi = new UTApi();

  constructor(private readonly prismaService: PrismaService) {}
  async create({
    authorId,
    description,
    dietType,
    difficulty,
    ingredients,
    name,
    preparationProcess,
    file,
  }: CreateRecipeDto & { file: Express.Multer.File }) {
    if (
      !authorId ||
      !description ||
      !dietType ||
      !difficulty ||
      !ingredients ||
      !name ||
      !preparationProcess
    )
      throw new BadRequestException();

    const imageUpload = await this.utApi.uploadFiles(file as unknown as File);

    console.log(imageUpload.error);

    if (imageUpload.error) throw new InternalServerErrorException();

    const recipe = await this.prismaService.recipe.create({
      data: {
        description,
        dietType,
        difficulty,
        imageUrl: imageUpload.data.ufsUrl,
        ingredients,
        name,
        preparationProcess,
        author: {
          connect: {
            id: authorId,
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

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
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
