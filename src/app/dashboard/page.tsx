import { Dashboard } from "@/features/dashboard/dashboard";
import { api } from "@/trpc/server";

const DashboardPage = async () => {
  const meals = await api.recipe.getByUser();
  return <Dashboard meals={meals} />;
};

export default DashboardPage;
