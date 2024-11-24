import { MealSidebar } from "@/shared/components/ui/sidebar/sidebar";

const MealLayout = ({ children }: { children: React.ReactNode }) => {
  return <MealSidebar>{children}</MealSidebar>;
}

export default MealLayout;
