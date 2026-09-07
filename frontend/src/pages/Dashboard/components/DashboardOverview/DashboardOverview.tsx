import styles from "@/pages/Dashboard/components/DashboardOverview/DashboardOverview.module.css";
import OverviewContent from "./OverviewContent/OverviewContent";
import DashboardRecentsUsers from "./OverviewRecentUsers/OverviewRecentUsers";
import { useEffect, useState } from "react";
import { Request } from "@/services/apiClient";

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

const DashboardOverview = () => {
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
            const res = await Request.get(`/admin/stats`);

            if(!res) {
                throw new Error(`Falha ao carregar dados da Dashboard`);
            };

            setDashboardData(res.data);

            setLoading(false);
        }

        loadDashboard();
    }, []);

    return (
        <>
            <div className={`${styles["overview-content"]}`}>
                <OverviewContent loading={loading} dashboardData={dashboardData.totals} />
                <DashboardRecentsUsers loading={loading} recentUsers={dashboardData.recentUsers} />
            </div>
        </>
    )     
}

export default DashboardOverview;