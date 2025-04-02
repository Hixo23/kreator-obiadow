export interface IRecipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | undefined;
  preparationProcess: string;
  ingredients: string;
  dietType: string;
  difficulty: string;
  authorId?: string;
  preparationTime: number;
  servings: number;
}

export interface IUser {
  role: string;
  email: string;
  id: string;
  profile: IProfile
}

export interface IProfile {
  username: string;
  description: string;
  recipes: IRecipe[];
  id: string
}

export interface IComment {
  id: string;
  content: string;
  rating: number;
  recipeId: string;
  authorId: string;
  author: IProfile;
}
