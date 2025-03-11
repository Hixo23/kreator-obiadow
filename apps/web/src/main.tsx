import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/styles/index.css";
import { Router } from "./routes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>,
);
