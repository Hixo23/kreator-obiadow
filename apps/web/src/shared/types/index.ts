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
  username: string;
  email: string;
  id: string;
  recipes: IRecipe[];
}

export interface IComment {
  id: string;
  content: string;
  rating: number;
  recipeId: string;
  authorId: string;
  author: IUser;
}
