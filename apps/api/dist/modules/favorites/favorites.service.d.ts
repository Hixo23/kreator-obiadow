import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma.service';
export declare class FavoritesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createFavoriteDto: CreateFavoriteDto): Promise<{
        id: string;
        recipeId: string;
        profileId: string;
    }>;
    findAll(): Promise<{
        id: string;
        recipeId: string;
        profileId: string;
    }[]>;
    findOne(id: string, userId?: string): Promise<{
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
    remove(id: string, authorId: string): Promise<{
        id: string;
        recipeId: string;
        profileId: string;
    }>;
}
