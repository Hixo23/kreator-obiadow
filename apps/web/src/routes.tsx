import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { AppLayout } from "./shared/components/layouts/app-layout";
import { SignIn } from "./features/auth/pages/sign-in";
import { SignUp } from "./features/auth/pages/sign-up";
import { AddRecipePage } from "@/features/recipes/pages/add-recipe.tsx";
import { ProtectedRoute } from "@/shared/components/protected-route.tsx";
import { SingleRecipePage } from "@/features/recipes/pages/single-recipe-page.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="recipe">
            <Route
              path="add"
              element={
                <ProtectedRoute>
                  <AddRecipePage />
                </ProtectedRoute>
              }
            />
            <Route path=":id" element={<SingleRecipePage />} />
          </Route>
        </Route>
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
