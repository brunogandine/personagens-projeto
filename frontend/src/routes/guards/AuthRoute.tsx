import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/LoggedUserContext";

export const AuthRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;

    if(!user)
        return (
        <Navigate 
            to="/access-denied" 
            replace 
            state={{message: "Você precisa estar logado para acessar esse conteúdo."}}
        />);

    return <Outlet />;
}