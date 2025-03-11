import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/shadcn/sidebar";
import AppSidebar from "../ui/sidebar/sidebar";
import { ThemeProvider } from "../theme-provider";

export const AppLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="dark w-full min-h-full">
          <SidebarTrigger />

          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};
