import { useAuth } from "../../contexts/AuthContext";
import SidebarMenu from "./components/SidebarMenu";
import { Outlet } from "react-router-dom";
import MainComponent from "./components/MainComponent";

const AdmPanel = () => {
    return (
        <>
            <div id="adm-panel">
                <SidebarMenu />
                <MainComponent>
                    <Outlet />
                </MainComponent>
            </div>
        </>
    )
}

export default AdmPanel;