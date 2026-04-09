import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css"
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";

const Dashboard = () => {
    return (
        <>
            <div id="app-dashboard" className={`${styles["dashboard"]}`}>
                <Sidebar />
                <DashboardContent>
                    <Outlet />
                </DashboardContent>
            </div>
        </>
    )
}

export default Dashboard;