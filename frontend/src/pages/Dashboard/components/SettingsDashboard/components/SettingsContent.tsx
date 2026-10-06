import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import MaintenanceSettings from "./MaintenanceSettings";
import UnsavedChangesBar from "@/shared/components/UnsavedChangesBar/UnsavedChangesBar";
import { HddFilled, SettingFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { Request } from "@/services/apiClient";
import type { MaintenanceSettingsState } from "@/pages/Dashboard/components/SettingsDashboard/types/settings.types";

const SettingsContent = () => {
    const [originalSettings, setOriginalSettings] = useState<MaintenanceSettingsState>({enabled: false, message: ""});
    const [maintenance, setMaintenance] = useState<MaintenanceSettingsState>({enabled: false, message: ""});
    const [loading, setLoading] = useState(true);

    const { showToast } = useMessageModal();

    useEffect(() => {
        const loadSettings = async () => {
            const res = await Request.get("/settings/maintenance");

            if(!res.ok) {
                if(res.status === 500) {
                    showToast({
                        type: "error",
                        text: "Erro ao carregar configurações de manutenção."
                    });

                    return;
                };
            };

            const settings = {
                enabled: res.data.enabled,
                message: res.data.message
            };

            setOriginalSettings(settings);
            setMaintenance(settings);
            
            setLoading(false);
        };

        loadSettings();
    }, []);

    const handleReset = () => {
        setMaintenance(originalSettings);
    };

    const handleConfirm = () => {
        console.log("oi");
    };

    const hasChanges = 
        maintenance.enabled !== originalSettings.enabled ||
        maintenance.message !== originalSettings.message

    return (
        <>
            <section className={`${styles["settings-header"]}`}>
                <SettingFilled style={{ fontSize: '1.7rem' }} />
                <div className={`${styles["settings-header-line"]}`}>
                    <h1>Configurações</h1>
                    <span style={{fontSize: `0.85rem`}}>Gerencie as regras e comportamentos do sistema.</span>
                </div>
            </section>
            <section className={`${styles["settings-content-wrapper"]}`}>
                <section className={`${styles["settings-content"]}`}>
                    <section className={`${styles["settings-section"]}`}>
                        <div className={`${styles["settings-section-header"]}`}>
                            <HddFilled style={{fontSize: `1.8rem`}} />
                            <div className={`${styles["settings-section-header-line"]}`}>
                                <h1>Sistema</h1>
                                <span style={{fontSize: `0.85rem`}}>Configurações gerais do sistema e modo Manutenção.</span>
                            </div>
                        </div>
                        <div className={`${styles["settings-section-items"]}`}>
                            <MaintenanceSettings 
                                settings={maintenance}
                                loading={loading}
                                onChange={setMaintenance}
                            />
                        </div>          
                    </section>
                </section>
            </section>
            <UnsavedChangesBar 
                redefine={handleReset}
                confirm={handleConfirm}
                visible={hasChanges}
            />
        </>
    );
};

export default SettingsContent;