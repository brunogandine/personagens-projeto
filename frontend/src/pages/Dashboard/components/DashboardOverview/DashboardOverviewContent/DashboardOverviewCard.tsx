import styles from "../../../Dashboard.module.css"

type Props = {
    id: string;
    title: string;
    value: number;
}

const DashboardCardOverview = ({id, title, value}: Props) => {
    return (
        <>
            <div id={id} className={`${styles["overview-card"]}`}>
                <div className={`${styles["card-icon"]}`}>TESTE</div>
                <div className={`${styles["card-values"]}`}>
                    <span className={`${styles["card-value-title"]}`}>{title}</span>
                    <span className={`${styles["card-value"]}`}>{value}</span>
                </div>
            </div>
        </>
    )
}

export default DashboardCardOverview;