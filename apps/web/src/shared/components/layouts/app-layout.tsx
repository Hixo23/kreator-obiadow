import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/shadcn/sidebar";
import AppSidebar from "../ui/sidebar/sidebar";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="dark w-full min-h-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
