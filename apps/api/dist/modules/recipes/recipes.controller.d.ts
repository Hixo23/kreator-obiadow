import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Request } from 'express';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto, file: Express.Multer.File, request: Request): Promise<{
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
    update(id: string, updateRecipeDto: UpdateRecipeDto, file: Express.Multer.File, request: Request): Promise<{
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
