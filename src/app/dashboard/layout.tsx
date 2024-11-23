import { MealSidebar } from "@/shared/components/ui/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await currentUser();
  if (!session?.id) redirect("/");
  return <MealSidebar>{children}</MealSidebar>;
};

export default DashboardLayout;
