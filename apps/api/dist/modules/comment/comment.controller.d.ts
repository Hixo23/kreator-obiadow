import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, req: Request): Promise<{
        id: string;
        authorId: string;
        content: string;
        rating: number;
        recipeId: string;
    }>;
    findAll(recipeId: string): Promise<({
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
    update(id: string, updateCommentDto: UpdateCommentDto, req: Request): Promise<{
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
