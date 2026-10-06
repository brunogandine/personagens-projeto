import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import type { ReactNode } from "react";

type SettingsItemInfoProps = {
    icon: ReactNode,
    title: string,
    children: ReactNode
}

const SettingsItemInfo = ({icon, title, children}: SettingsItemInfoProps) => {
    return (
        <>
            <div className={`${styles["settings-item-info-header"]}`}>
                {icon}
                <div className={`${styles["settings-item-info-header-line"]}`}>
                    <h1>{title}</h1>
                </div>
            </div>
            <div className={`${styles["settings-item-info-content"]}`}>
                {children}
            </div>
        </>
    )
};

export default SettingsItemInfo;