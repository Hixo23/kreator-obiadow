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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let RecipesService = class RecipesService {
    prismaService;
    cloudinaryService;
    constructor(prismaService, cloudinaryService) {
        this.prismaService = prismaService;
        this.cloudinaryService = cloudinaryService;
    }
    async create({ description, dietType, difficulty, ingredients, name, preparationProcess, file, authorId, preparationTime, servings, }) {
        if (!description ||
            !dietType ||
            !difficulty ||
            !ingredients ||
            !name ||
            !preparationProcess ||
            !preparationTime ||
            !servings)
            throw new common_1.BadRequestException();
        const imageUpload = await this.cloudinaryService.uploadFile(file);
        if (imageUpload.error)
            throw new common_1.InternalServerErrorException();
        const recipe = await this.prismaService.recipe.create({
            data: {
                description,
                dietType,
                difficulty,
                imageUrl: imageUpload.url,
                ingredients,
                name,
                preparationProcess,
                preparationTime: +preparationTime,
                servings: +servings,
                author: {
                    connect: {
                        userId: authorId,
                    },
                },
            },
        });
        return recipe;
    }
    async findAll() {
        return await this.prismaService.recipe.findMany();
    }
    async findOne(id) {
        if (!id)
            throw new common_1.BadRequestException();
        return await this.prismaService.recipe.findFirst({
            where: {
                id,
            },
        });
    }
    async findByUser(userId) {
        if (!userId)
            throw new common_1.BadRequestException();
        return await this.prismaService.recipe.findMany({
            where: {
                authorId: userId,
            },
        });
    }
    async update(id, { authorId, description, dietType, difficulty, ingredients, name, preparationProcess, }, file) {
        const isRecipeExists = await this.findOne(id);
        if (!isRecipeExists)
            throw new common_1.NotFoundException();
        if (isRecipeExists.authorId !== authorId)
            throw new common_1.ForbiddenException('Ten przepis nie należy do ciebie');
        if (file) {
            const imageUpload = await this.cloudinaryService.uploadFile(file);
            if (imageUpload.error)
                throw new common_1.InternalServerErrorException();
            return await this.prismaService.recipe.update({
                where: {
                    id,
                    authorId,
                },
                data: {
                    imageUrl: imageUpload.url,
                },
            });
        }
        const updatedRecipe = await this.prismaService.recipe.update({
            where: {
                id: id,
                authorId,
            },
            data: {
                description,
                dietType,
                difficulty,
                ingredients,
                name,
                preparationProcess,
            },
        });
        return updatedRecipe;
    }
    async remove(id) {
        if (!id)
            throw new common_1.BadRequestException();
        return await this.prismaService.recipe.delete({
            where: {
                id,
            },
        });
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map