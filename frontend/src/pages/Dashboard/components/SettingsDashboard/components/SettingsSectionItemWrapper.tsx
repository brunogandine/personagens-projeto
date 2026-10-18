import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import type { ReactNode } from "react";

type SettingsSectionItemWrapperProps = {
    children: ReactNode,
    info: ReactNode
}

const SettingsSectionItemWrapper = ({children, info}: SettingsSectionItemWrapperProps) => {
    return (
        <>
            <div className={`${styles["settings-section-item-wrapper"]}`}>
                <div className={`${styles["settings-section-item"]}`}>
                    {children}
                </div>
                <div className={`${styles["settings-section-item-info"]}`}>
                    {info}
                </div>
            </div>
        </>
    );
};

export default SettingsSectionItemWrapper;