import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ProfileService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<{
        id: string;
        username: string;
        description: string;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        favorite: {
            id: string;
            recipeId: string;
            profileId: string;
        }[];
        recipes: {
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
        }[];
        comments: {
            id: string;
            authorId: string;
            content: string;
            rating: number;
            recipeId: string;
        }[];
    } & {
        id: string;
        username: string;
        description: string;
        userId: string;
    }>;
    update(id: string, { description, username }: UpdateProfileDto): Promise<{
        id: string;
        username: string;
        description: string;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        username: string;
        description: string;
        userId: string;
    }>;
}
