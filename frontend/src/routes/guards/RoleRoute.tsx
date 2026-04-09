import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { AuthUser } from "../../types/AuthUser";

type UserPowers = AuthUser["user_power"];

type Props = {
    allowed: UserPowers[]
}

export const RoleRoute = ({allowed}: Props) => {
    const { user, loading } = useAuth();

    if(loading) 
        return <div>Carregando...</div>

    if(!user)
        return <Navigate 
            to="/"
            replace
            state={{message: `Você precisa estar logado para acessar esta página.`}}
        />

    if(!allowed.includes(user.user_power))
        return <Navigate 
            to="/access-denied"
            replace
            state={{message: "Você não tem permissão para acessar esta página."}}
        />

    return <Outlet />
}