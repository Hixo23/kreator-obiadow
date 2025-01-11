export type Meal = {
  id: string;
  name: string;
  description: string | null;
  preparationTime: number | null;
  portions: number | null;
  ingredients: string | null;
  image: string | null;
  userId: string;
  preparationProcess: string;
  category: string | null;
  subcategory: string | null;
  dietType: string | null;
  difficulty: string | null;
};
