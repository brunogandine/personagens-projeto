import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
    selected: boolean
}

export const CharacterRoute = ({selected}: Props) => {
    const { user, loading } = useAuth();

    if(loading) return <div>Carregando...</div>

    if(!user || !selected)
        return <Navigate
            to="/access-denied"
            replace
            state={{message: "Você precisa estar com um personagem selecionado para acessar essa página!"}}
        />

    return <Outlet />
}