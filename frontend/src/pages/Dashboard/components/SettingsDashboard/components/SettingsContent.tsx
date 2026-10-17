import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import MaintenanceSettings from "./MaintenanceSettings";
import UnsavedChangesBar from "@/shared/components/UnsavedChangesBar/UnsavedChangesBar";
import useSettings from "@/pages/Dashboard/components/SettingsDashboard/hooks/useSettings";
import { HddFilled, SettingFilled } from "@ant-design/icons";
import { useMessageModal } from "@/contexts/UIFeedbackContext";

const SettingsContent = () => {
    const { settings, setMaintenance, setOriginalMaintenance, hasChanges, isSaving, handleReset, handleConfirm,  } = useSettings()
    const { showToast } = useMessageModal();

    const handleOnGetFailure = (message: string) => {
        showToast({
            type: "error",
            text: message
        });
    };

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
                                settings={settings.maintenance}
                                onOriginalChange={setOriginalMaintenance}
                                onChange={setMaintenance}
                                onFail={handleOnGetFailure}
                            />
                        </div>          
                    </section>
                </section>
            </section>
            <UnsavedChangesBar 
                redefine={handleReset}
                confirm={handleConfirm}
                visible={hasChanges}
                isSaving={isSaving}
            />
        </>
    );
};

export default SettingsContent;