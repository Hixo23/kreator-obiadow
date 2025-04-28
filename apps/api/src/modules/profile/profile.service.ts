import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  UpdateProfileDto,
  updateProfileSchema,
} from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.profile.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.profile.findUnique({
      where: {
        id,
      },
      include: {
        recipes: true,
        favorite: true,
        comments: true,
      },
    });
  }

  async update(id: string, data: UpdateProfileDto) {
    try {
      const {
        data: { description, username },
      } = updateProfileSchema.safeParse(data);
      return await this.prismaService.profile.update({
        data: {
          description,
          username,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.formErrors.fieldErrors);
      }
      throw new BadRequestException('Invalid data');
    }
  }

  async remove(id: string) {
    return await this.prismaService.profile.delete({
      where: {
        id,
      },
    });
  }
}
