import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const ContentDashboardComponent = ({children}:  Props) => {
    return (
        <div className={`${styles["content-main"]}`}>
            {children}
        </div>
    )
}

export default ContentDashboardComponent;