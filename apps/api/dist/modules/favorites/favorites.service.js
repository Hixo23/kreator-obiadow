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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let FavoritesService = class FavoritesService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createFavoriteDto) {
        if (!createFavoriteDto.recipeId || !createFavoriteDto.userId)
            throw new common_1.BadRequestException();
        const existingFavorite = await this.findOne(createFavoriteDto.recipeId, createFavoriteDto.userId);
        if (existingFavorite &&
            existingFavorite.profileId === createFavoriteDto.userId)
            throw new common_1.ConflictException();
        return await this.prismaService.favorite.create({
            data: {
                profile: {
                    connect: {
                        id: createFavoriteDto.userId,
                    },
                },
                recipe: {
                    connect: {
                        id: createFavoriteDto.recipeId,
                    },
                },
            },
        });
    }
    async findAll() {
        return await this.prismaService.favorite.findMany();
    }
    async findOne(id, userId) {
        return await this.prismaService.favorite.findFirst({
            where: {
                recipeId: id,
                ...(userId && { profileId: userId }),
            },
            include: {
                recipe: true,
            },
        });
    }
    async remove(id, authorId) {
        const existingFavorite = await this.findOne(id);
        if (existingFavorite && existingFavorite.profileId !== authorId)
            throw new common_1.ForbiddenException();
        return await this.prismaService.favorite.delete({
            where: {
                id,
            },
        });
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map