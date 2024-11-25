import { Dashboard } from "@/features/dashboard/dashboard";
import { mealRepository } from "@/server/repositiries/meals";

const DashboardPage = async () => {
  const meals = await mealRepository.findMany();
  return <Dashboard meals={meals} />;
};

export default DashboardPage;
