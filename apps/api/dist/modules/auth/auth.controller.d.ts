import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(body: CreateUserDto): Promise<{
        message: string;
    }>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUser(req: Request): Promise<{
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
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
}
