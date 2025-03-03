import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './utils/uploadThing';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    '/api/uploadthing',
    createRouteHandler({
      router: uploadRouter,
      config: {
        token: process.env.UPLOADTHING_TOKEN,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
