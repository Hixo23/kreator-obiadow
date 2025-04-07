import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';

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

  async update(id: string, { description, username }: UpdateProfileDto) {
    Logger.debug({ id, description, username });
    if (!description || !id || !username)
      throw new BadRequestException({
        message: 'Błędne dane',
        statusCode: 400,
      });

    return await this.prismaService.profile.update({
      data: {
        description,
        username,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.profile.delete({
      where: {
        id,
      },
    });
  }
}
