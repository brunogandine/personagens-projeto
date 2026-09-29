import ContentDashboardContainer from "./components/ContentDashboardContainer";
import { Outlet } from "react-router-dom";

const ContentDashboard = () => {
    return (
        <ContentDashboardContainer>
            <Outlet />   
        </ContentDashboardContainer>
    )
}

export default ContentDashboard;