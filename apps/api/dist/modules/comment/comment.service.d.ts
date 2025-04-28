import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CommentService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create({ authorId, content, rating, recipeId }: CreateCommentDto): Promise<{
        id: string;
        authorId: string;
        content: string;
        rating: number;
        recipeId: string;
    }>;
    findOne(id: string): Promise<{
        author: {
            id: string;
            username: string;
            description: string;
            userId: string;
        };
    } & {
        id: string;
        authorId: string;
        content: string;
        rating: number;
        recipeId: string;
    }>;
    findAll(id: string): Promise<({
        author: {
            id: string;
            username: string;
            description: string;
            userId: string;
        };
    } & {
        id: string;
        authorId: string;
        content: string;
        rating: number;
        recipeId: string;
    })[]>;
    update(id: string, { rating, content }: UpdateCommentDto): Promise<{
        id: string;
        authorId: string;
        content: string;
        rating: number;
        recipeId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
