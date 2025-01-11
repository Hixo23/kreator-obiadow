
import { AddNewMealForm } from "./add-new-meal-form";

export const AddNewMeal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Dodaj nowy przepis</h1>
      <AddNewMealForm />
    </div >
  );
};
