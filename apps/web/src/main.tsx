import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/styles/index.css";
import { Router } from "./routes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "./shared/components/theme-provider.tsx";
import { UserProvider } from "./shared/contexts/userContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
