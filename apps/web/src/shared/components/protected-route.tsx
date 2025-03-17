import { ReactNode, useEffect } from "react";
import { useUser } from "@/shared/contexts/userContext.tsx";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.user || user?.error) navigate("/auth/sign-in");
  }, [navigate, user?.error, user?.user]);

  return children;
};
