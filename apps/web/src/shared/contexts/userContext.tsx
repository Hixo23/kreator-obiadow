import { createContext, useContext } from "react";
import { IUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth/getUser";

interface UserContextType {
  user: IUser | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
