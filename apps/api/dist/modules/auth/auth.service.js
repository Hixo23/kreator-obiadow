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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prismaService;
    jwtService;
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async validateUser({ email, password }) {
        if (!email || !password)
            throw new common_1.BadRequestException("Brakuje danych");
        const user = await this.prismaService.user.findFirst({
            where: {
                email: email,
            },
            include: {
                profile: {
                    include: {
                        comments: true,
                        recipes: true
                    }
                }
            }
        });
        if (!user)
            throw new common_1.NotFoundException("Nie znaleziono użytkownika z takim mailem!");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            throw new common_1.UnauthorizedException("Błędne dane");
        return user;
    }
    async login(user) {
        const mappedUser = this.mapUser(user);
        return {
            access_token: this.jwtService.sign(mappedUser),
        };
    }
    mapUser(user) {
        return {
            role: user.role,
            email: user.email,
            id: user.id,
            profile: {
                id: user.profile.id,
                username: user.profile.username,
                recipes: user.profile.recipes,
                comments: user.profile.comments
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map