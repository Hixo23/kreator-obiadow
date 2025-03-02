import { User, Recipe } from '@prisma/client';
import { Express } from 'express-serve-static-core';
declare global {
  namespace Express {
    interface Request {
      user?: User & { recipes: Recipe[] };
    }
  }
}
