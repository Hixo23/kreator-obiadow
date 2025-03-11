import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { AppLayout } from "./shared/components/layouts/app-layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
