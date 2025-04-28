import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from 'src/types';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    validateUser({ email, password }: LoginDto): Promise<{
        profile: {
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
    login(user: RequestUser): Promise<{
        access_token: string;
    }>;
    mapUser(user: RequestUser): {
        role: import("@prisma/client").$Enums.Role;
        email: string;
        id: string;
        profile: {
            id: string;
            username: string;
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
        };
    };
}
