import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const AuthRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;

    if(!user)
        return (
        <Navigate 
            to="/" 
            replace 
            state={{message: "Você precisa estar logado para acessar esta página."}}
        />);

    return <Outlet />;
}