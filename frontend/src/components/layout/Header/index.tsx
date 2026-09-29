import HeaderPublic from "./HeaderPublic";
import HeaderLogged from "./HeaderLogged";
import { useAuth } from "../../../contexts/AuthContext";

export const Header = () => {
    const { user, loading } = useAuth();

    return (
        <>
            {user && !loading ? <HeaderLogged user={user} loading={loading}/> : <HeaderPublic />}
        </>
    )
}