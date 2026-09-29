import styles from "@/pages/Dashboard/components/DashboardOverview/DashboardOverview.module.css";
import DashboardCardOverview from "./OverviewCard";
import { CrownFilled, ProfileFilled, SafetyOutlined, TeamOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

type DashboardData = {
    usersCount: number;
    charactersCount: number;
    moderatorsCount: number;
    adminsCount: number;
}

type DashboardCard = {
    key: keyof DashboardData;
    id: string;
    title: string;
    icon: ReactNode;
}

type Props = {
    loading: boolean;
    dashboardData: DashboardData;
}

const OverviewContent = ({loading, dashboardData}: Props) => {
    const dashboardCards: DashboardCard[] = [
        {
            key: "usersCount",
            id: "total-users",
            title: "Total de Usuários",
            icon: <TeamOutlined />
        },
        {
            key: "charactersCount",
            id: "total-characters",
            title: "Total de Personagens",
            icon: <ProfileFilled />
        },
        {
            key: "moderatorsCount",
            id: "total-moderators",
            title: "Total de Moderadores",
            icon: <SafetyOutlined />
        },
        {
            key: "adminsCount",
            id: "total-admins",
            title: "Total de Administradores",
            icon: <CrownFilled />
        }
    ];

    return (
        <>
            {loading 
                ? <p>Carregando...</p>
                : <div className={`${styles["app-overview"]}`}>
                    <div className={`${styles["overview-section"]}`}>
                        <div className={`${styles["overview-section-title"]}`}>
                            Visão Geral da Aplicação
                        </div>
                        <div className={`${styles["overview-cards-container"]}`}>
                            {dashboardCards.map((card) => (
                                    <DashboardCardOverview 
                                        key={card.key}
                                        id={card.id} 
                                        title={card.title} 
                                        value={dashboardData[card.key]}
                                        icon={card.icon}
                                    />
                                ))                    
                            }
                        </div>
                    </div>
                 </div>
            }
        </>
    )
}

export default OverviewContent;