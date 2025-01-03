import { MealManager } from "@/features/meal-manager/meal-manager";
import { mealRepository } from "@/server/repositiries/meals";
import { currentUser } from "@clerk/nextjs/server";

const MealManagerPage = async () => {
  const user = await currentUser();
  const meals = await mealRepository.findByUser(user!.id);
  return <MealManager meals={meals} />;
};

export default MealManagerPage;
