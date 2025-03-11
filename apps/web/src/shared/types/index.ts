export interface IRecipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  preparationProcess: string;
  ingredients: string;
  dietType: string;
  difficulty: string;
  authorId: string;
}

export interface IUser {
  role: string;
  username: string;
  email: string;
  id: string;
  recipes: IRecipe[];
}
