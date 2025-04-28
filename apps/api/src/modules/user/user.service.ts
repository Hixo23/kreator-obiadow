import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const {
        data: { email, password, username },
      } = createUserSchema.safeParse(createUserDto);

      const userIsExist = await this.findOne(email);

      if (userIsExist) {
        throw new ConflictException();
      }

      const hashedPassword = await bcrypt.hash(password, 1);

      await this.prismaService.user.create({
        data: {
          email: email,
          password: hashedPassword,
          profile: {
            create: {
              description: '',
              username: username,
            },
          },
        },
      });
      return { message: 'user created' };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.formErrors.fieldErrors);
      }
      if (error instanceof ConflictException) {
        throw new ConflictException('User already exists');
      }
      throw new BadRequestException('Invalid data');
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(email: string) {
    if (!email) throw new BadRequestException();
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const {
        data: { email, password },
      } = updateUserSchema.safeParse(updateUserDto);
      if (!id) throw new BadRequestException();
      return await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          email: email,
          password: password,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.formErrors.fieldErrors);
      }
      if (error instanceof ConflictException) {
        throw new ConflictException('User already exists');
      }
      throw new BadRequestException('Invalid data');
    }
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException();
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
