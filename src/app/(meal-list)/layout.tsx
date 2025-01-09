import "@/shared/styles/globals.css";
import { MealSidebar } from "@/shared/components/ui/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MealSidebar>{children}</MealSidebar>;
}
