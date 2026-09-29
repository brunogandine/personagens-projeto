import styles from "../../AdmPanel.module.css";

import DashboardOverview from "./DashboardOverview/DashboardOverview";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import DashboardRecentsUsers from "./DashboardRecentUsers/DashboardRecentUsers";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type DashboardData = {
    totals: {
        usersCount: number;
        charactersCount: number;
        moderatorsCount: number;
        adminsCount: number;
    },
    recentUsers: {
        id: number;
        username: string;
        avatar_url: string | null;
        created_at: string;
    }[]
}

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData>({ 
        totals: { 
            usersCount: 0, 
            charactersCount: 0, 
            moderatorsCount: 0, 
            adminsCount: 0 
        },
        recentUsers: []
    });

    useEffect(() => {
        const loadDashboard = async () => {
            const res = await fetch(`${BASE_URL}/api/admin/stats`, {
                method: "GET",
                credentials: "include"
            });

            if(!res.ok) {
                throw new Error(`Erro ao carregar dados da Dashboard`);
            };

            const data = await res.json();

            console.log(data)

            setDashboardData(data);

            setLoading(false);
        }

        loadDashboard();
    }, []);

    return (
        <>
            <div className={`${styles["adm-content"]}`}>
                <DashboardOverview loading={loading} dashboardData={dashboardData.totals} />
                <DashboardRecentsUsers loading={loading} recentUsers={dashboardData.recentUsers} />
            </div>
        </>
    )     
}

export default Dashboard;