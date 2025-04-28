import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Request } from 'express';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto, req: Request): Promise<{
        id: string;
        recipeId: string;
        profileId: string;
    }>;
    findAll(): Promise<{
        id: string;
        recipeId: string;
        profileId: string;
    }[]>;
    findOne(id: string, req: Request): Promise<{
        recipe: {
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
        };
    } & {
        id: string;
        recipeId: string;
        profileId: string;
    }>;
    remove(id: string, req: Request): Promise<{
        id: string;
        recipeId: string;
        profileId: string;
    }>;
}
