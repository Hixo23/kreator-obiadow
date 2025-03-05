import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, PrismaService, CloudinaryService],
})
export class RecipesModule {}
