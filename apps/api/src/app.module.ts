import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CommentModule } from './modules/comment/comment.module';
import { ProfileModule } from './modules/profile/profile.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RecipesModule,
    CloudinaryModule,
    CommentModule,
    ProfileModule,
    FavoritesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
