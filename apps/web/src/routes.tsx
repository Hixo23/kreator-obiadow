import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { AppLayout } from "./shared/components/layouts/app-layout";
import { SignIn } from "./features/auth/pages/sign-in";
import { SignUp } from "./features/auth/pages/sign-up";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
