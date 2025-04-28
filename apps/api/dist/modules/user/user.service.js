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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        if (!createUserDto.username ||
            !createUserDto.email ||
            !createUserDto.password) {
            throw new common_1.BadRequestException();
        }
        const userIsExist = await this.findOne(createUserDto.email);
        if (userIsExist) {
            throw new common_1.ConflictException();
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 1);
        await this.prismaService.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
                profile: {
                    create: {
                        description: '',
                        username: createUserDto.username,
                    },
                },
            },
        });
        return { message: 'user created' };
    }
    async findAll() {
        return await this.prismaService.user.findMany();
    }
    async findOne(email) {
        if (!email)
            throw new common_1.BadRequestException();
        return await this.prismaService.user.findFirst({
            where: {
                email,
            },
            include: {
                profile: {
                    include: {
                        comments: true,
                        recipes: true,
                        favorite: {
                            include: {
                                recipe: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async update(id, updateUserDto) {
        if (!id)
            throw new common_1.BadRequestException();
        return await this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                email: updateUserDto.email,
                password: updateUserDto.password,
            },
        });
    }
    async remove(id) {
        if (!id)
            throw new common_1.BadRequestException();
        return await this.prismaService.user.delete({
            where: {
                id,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map