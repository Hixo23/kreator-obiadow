import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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

    const imageUpload = await this.cloudinaryService.uploadFile(file);
    console.log(imageUpload.url);
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
