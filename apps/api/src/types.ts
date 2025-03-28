import { Recipe, Role } from '@prisma/client';

export type RequestUser = {
  id: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  recipes: Recipe[];
};
