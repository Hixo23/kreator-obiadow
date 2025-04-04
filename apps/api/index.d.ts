import { User, Recipe } from '@prisma/client';
import { Express } from 'express-serve-static-core';
import { RequestUser } from 'src/types';
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}
