import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new BadRequestException();
    }

    const userIsExist = await this.findOne(createUserDto.email);

    if (userIsExist) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 1);

    await this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
    return { message: 'user created' };
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
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!id) throw new BadRequestException();
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
        username: updateUserDto.username,
      },
    });
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
