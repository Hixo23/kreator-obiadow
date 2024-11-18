import { MealList } from "@/features/meals/components/meal-list/meal-list";
import { api } from "@/trpc/server";

const MealCategoryPage = async ({ params }: { params: { name: string } }) => {
  const meals = await api.recipe.getByCategory({ category: params.name });
  return (
    <main className="flex h-full w-full flex-col items-center justify-center dark:text-white">
      <h1 className="mx-auto text-nowrap py-24 text-center text-5xl font-semibold uppercase">
        {params.name.charAt(0).toUpperCase() +
          params.name.replace("-", " ").slice(1)}
      </h1>
      <div className="flex w-full flex-col items-center">
        <MealList meals={meals} />
      </div>
    </main>
  );
};

export default MealCategoryPage;
