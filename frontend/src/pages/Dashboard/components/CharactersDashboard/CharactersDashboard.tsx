import CharacterDashboardContent from "./components/CharactersContainer";
import { Outlet } from "react-router-dom";

const CharactersDashboard = () => {
    return (
        <CharacterDashboardContent >
            <Outlet />   
        </CharacterDashboardContent>
    )
}

export default CharactersDashboard;

