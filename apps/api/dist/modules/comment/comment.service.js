"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let CommentService = class CommentService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create({ authorId, content, rating, recipeId }) {
        if (!authorId || !content || !rating || !recipeId)
            throw new common_1.BadRequestException();
        const comment = await this.prismaService.comment.create({
            data: {
                content,
                rating,
                author: {
                    connect: {
                        userId: authorId,
                    },
                },
                recipe: {
                    connect: {
                        id: recipeId,
                    },
                },
            },
        });
        return comment;
    }
    async findOne(id) {
        const comment = await this.prismaService.comment.findFirst({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });
        return comment;
    }
    async findAll(id) {
        const comments = await this.prismaService.comment.findMany({
            where: {
                recipeId: id,
            },
            include: {
                author: true,
            },
        });
        return comments;
    }
    async update(id, { rating, content }) {
        const commentExists = await this.findOne(id);
        if (!commentExists)
            throw new common_1.NotFoundException();
        const updatedComment = await this.prismaService.comment.update({
            where: {
                id,
            },
            data: {
                content,
                rating,
            },
        });
        if (!updatedComment)
            throw new common_1.InternalServerErrorException();
        return updatedComment;
    }
    async remove(id) {
        const commentExists = await this.findOne(id);
        if (!commentExists)
            throw new common_1.NotFoundException();
        await this.prismaService.comment.delete({
            where: {
                id,
            },
        });
        return { message: 'comment deleted' };
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map