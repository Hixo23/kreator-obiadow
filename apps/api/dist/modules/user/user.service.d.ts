import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        id: string;
        password: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    findOne(email: string): Promise<{
        profile: {
            favorite: ({
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
            })[];
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
        };
    } & {
        id: string;
        password: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        password: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: string): Promise<{
        id: string;
        password: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
