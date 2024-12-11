import { Dashboard } from "@/features/dashboard/dashboard";
import { mealRepository } from "@/server/repositiries/meals";
import { currentUser } from "@clerk/nextjs/server";

const DashboardPage = async () => {
  const user = await currentUser();
  const meals = await mealRepository.findByUser(user!.id);
  return <Dashboard meals={meals} />;
};

export default DashboardPage;
