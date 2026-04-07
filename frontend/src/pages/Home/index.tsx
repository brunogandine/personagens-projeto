import HomePublic from "./HomePublic";
import HomeLogged from "./HomeLogged";
import { useAuth } from "../../contexts/AuthContext";

export const Home = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Carregando...</div>

    if (user) return <HomeLogged />

    return <HomePublic/>
}