import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: string;
        password: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    findOne(id: string): Promise<{
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
