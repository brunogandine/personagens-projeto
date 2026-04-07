import { useEffect, useState } from "react";
import styles from "../../../AdmPanel.module.css";
import DashboardCardOverview from "./DashboardOverviewCard";

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
}

type Props = {
    loading: boolean;
    dashboardData: DashboardData;
}

const DashboardOverview = ({loading, dashboardData}: Props) => {
    const dashboardCards: DashboardCard[] = [
        {
            key: "usersCount",
            id: "total-users",
            title: "Total de Usuários",
        },
        {
            key: "charactersCount",
            id: "total-characters",
            title: "Total de Personagens",
        },
        {
            key: "moderatorsCount",
            id: "total-moderators",
            title: "Total de Moderadores",
        },
        {
            key: "adminsCount",
            id: "total-admins",
            title: "Total de Administradores",
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

export default DashboardOverview;