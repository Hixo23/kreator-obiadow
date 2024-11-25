import { MealList } from "@/features/meals/components/meal-list/meal-list";

const MealCategoryPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center dark:text-white">
      <h1 className="mx-auto text-nowrap py-24 text-center text-5xl font-semibold uppercase">
        {(await params).name.charAt(0).toUpperCase() +
          (await params).name.replace("-", " ").slice(1)}
      </h1>
      <div className="flex w-full flex-col items-center">
        <MealList meals={meals} />
      </div>
    </main>
  );
};

export default MealCategoryPage;
