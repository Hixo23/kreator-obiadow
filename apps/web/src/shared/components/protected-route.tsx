import {ReactNode} from "react";
import {useUser} from "@/shared/contexts/userContext.tsx";
import {useNavigate} from "react-router";

export const ProtectedRoute = ({children}: { children: ReactNode }) =>  {
    const user = useUser()
    const navigate = useNavigate()
    if(!user?.isLoading && !user?.user?.id) navigate("/auth/sign-in");

   return children


}