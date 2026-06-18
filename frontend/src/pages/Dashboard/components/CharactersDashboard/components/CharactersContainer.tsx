import styles from "../../../Dashboard.module.css";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const CharacterDashboardContent = ({children}:  Props) => {
    return (
        <div className={`${styles["characters-content"]}`}>
            {children}
        </div>
    )
}

export default CharacterDashboardContent;