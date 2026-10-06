import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import type { ReactNode } from "react";

type SettingsItemProps = {
    icon: ReactNode,
    title: string,
    description: string,
    className?: ReactNode,
    children: ReactNode
};

const SettingsItem = ({icon, title, description, className, children}: SettingsItemProps) => {
    return (
        <div className={`${styles["settings-item"]} ${className ?? ""}`}>
            <div className={`${styles["settings-item-header"]}`}>
                {icon}
                <div className={`${styles["settings-item-header-line"]}`}>
                    <h1>{title}</h1>
                    <span style={{fontSize: `0.85rem`}}>{description}</span>
                </div>
            </div>
            <div className={`${styles["settings-item-content"]}`}>
                {children}
            </div>
        </div>
    );
};

export default SettingsItem;