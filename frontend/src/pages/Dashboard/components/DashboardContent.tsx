import type { ReactNode } from "react";
import HeaderMainAdmPanel from "./HeaderMainAdmPanel";
import styles from "../Dashboard.module.css";

type Props = {
    children: ReactNode;
};

const DashboardContent = ({children}: Props) => {
    return (
        <div id="dashboard-content" className={`${styles["dashboard-content"]}`}>
            <HeaderMainAdmPanel />
            {children}
        </div>
    )
}

export default DashboardContent;