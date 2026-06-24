import CharacterDashboardContent from "./components/ContentDashboard";
import { Outlet } from "react-router-dom";

const ContentDashboard = () => {
    return (
        <CharacterDashboardContent >
            <Outlet />   
        </CharacterDashboardContent>
    )
}

export default ContentDashboard;