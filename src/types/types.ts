export type Meal = {
  id: string;
  name: string;
  description: string | null;
  preparationTime: number | null;
  portions: number | null;
  ingredients: string | null;
  image: string
}
