import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class RecipesService {
    private readonly prismaService;
    private readonly cloudinaryService;
    constructor(prismaService: PrismaService, cloudinaryService: CloudinaryService);
    create({ description, dietType, difficulty, ingredients, name, preparationProcess, file, authorId, preparationTime, servings, }: CreateRecipeDto & {
        file: Express.Multer.File;
    }): Promise<{
        name: string;
        id: string;
        description: string;
        imageUrl: string;
        preparationProcess: string;
        preparationTime: number;
        ingredients: string;
        dietType: string;
        difficulty: string;
        servings: number;
        authorId: string;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        description: string;
        imageUrl: string;
        preparationProcess: string;
        preparationTime: number;
        ingredients: string;
        dietType: string;
        difficulty: string;
        servings: number;
        authorId: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        description: string;
        imageUrl: string;
        preparationProcess: string;
        preparationTime: number;
        ingredients: string;
        dietType: string;
        difficulty: string;
        servings: number;
        authorId: string;
    }>;
    findByUser(userId: string): Promise<{
        name: string;
        id: string;
        description: string;
        imageUrl: string;
        preparationProcess: string;
        preparationTime: number;
        ingredients: string;
        dietType: string;
        difficulty: string;
        servings: number;
        authorId: string;
    }[]>;
    update(id: string, { authorId, description, dietType, difficulty, ingredients, name, preparationProcess, }: UpdateRecipeDto, file: Express.Multer.File): Promise<{
        name: string;
        id: string;
        description: string;
        imageUrl: string;
        preparationProcess: string;
        preparationTime: number;
        ingredients: string;
        dietType: string;
        difficulty: string;
        servings: number;
        authorId: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        description: string;
        imageUrl: string;
        preparationProcess: string;
        preparationTime: number;
        ingredients: string;
        dietType: string;
        difficulty: string;
        servings: number;
        authorId: string;
    }>;
}
