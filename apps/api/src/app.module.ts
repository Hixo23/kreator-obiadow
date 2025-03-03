import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [UserModule, AuthModule, RecipesModule],
  controllers: [AppController],
})
export class AppModule {}
