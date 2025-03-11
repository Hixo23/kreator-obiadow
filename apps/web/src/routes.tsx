import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { AppLayout } from "./shared/components/layouts/app-layout";
import { SignIn } from "./features/auth/pages/sign-in";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
