import { Comment, Profile, Recipe, Role } from '@prisma/client';

export type RequestUser = {
  id: string;
  password: string;
  email: string;
  role: Role;
  profile: IProfile
};


interface IProfile extends Profile {
  recipes: Recipe[];
  comments: Comment[]
}
