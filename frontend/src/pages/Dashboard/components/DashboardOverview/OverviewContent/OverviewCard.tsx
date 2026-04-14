import type { ReactNode } from "react";
import styles from "../../../Dashboard.module.css"

type Props = {
    id: string;
    title: string;
    value: number;
    icon: ReactNode;
}

const OverviewCard = ({id, title, value, icon}: Props) => {
    return (
        <>
            <div id={id} className={`${styles["overview-card"]}`}>
                <div className={`${styles["card-icon"]}`}>{icon}</div>
                <div className={`${styles["card-values"]}`}>
                    <span className={`${styles["card-value-title"]}`}>{title}</span>
                    <span className={`${styles["card-value"]}`}>{value}</span>
                </div>
            </div>
        </>
    )
}

export default OverviewCard;