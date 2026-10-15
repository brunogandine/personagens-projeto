import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import MaintenanceSettings from "./MaintenanceSettings";
import UnsavedChangesBar from "@/shared/components/UnsavedChangesBar/UnsavedChangesBar";
import { HddFilled, SettingFilled } from "@ant-design/icons";
import { useState } from "react";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { Request } from "@/services/apiClient";
import { builderMaintenanceSave } from "../builders/settings.builders";
import type { MaintenanceSettingsState } from "@/pages/Dashboard/components/SettingsDashboard/types/settings.types";
import type { SettingsSaveOperation } from "@/pages/Dashboard/components/SettingsDashboard/builders/settings.builders";

type ApiError = {
    type: string, 
    message: string,
    key: string;
}

type CfgFailure =
    | {
        group?: "maintenance";
        cfg?: "enabled" | "message";
    }

const SettingsContent = () => {
    const [originalMaintenance, setOriginalMaintenance] = useState<MaintenanceSettingsState>({enabled: null, message: null});
    const [maintenance, setMaintenance] = useState<MaintenanceSettingsState>({enabled: null, message: null});

    const groupMap = {
        maintenance: {
            original: {
                enabled: () => setOriginalMaintenance((current) => ({...current, enabled: maintenance.enabled})),
                message: () => setOriginalMaintenance((current) => ({...current, message: maintenance.message}))
            },
            edit: {
                enabled: () => setMaintenance((current) => ({...current, enabled: originalMaintenance.enabled})),
                message: () => setMaintenance((current) => ({...current, message: originalMaintenance.message}))
            }
        }
    };

    const { showToast, showMessageModal } = useMessageModal();

    const handleReset = () => {
        setMaintenance(originalMaintenance);
    };

    const handleCfgSuccess = (successes: {key: string}[]) => {
        for(const success of successes) {
            const [group, cfg] = success.key.split(".");

            const groupCfg = groupMap[group as keyof typeof groupMap].original

            groupCfg[cfg as keyof typeof groupCfg]();
        };   
    };

    const handleCfgFailure = (errors: CfgFailure[]) => {
        for(const error of errors) {
            if(error.cfg && error.group) {
                const groupCfg = groupMap[error.group].edit;

                groupCfg[error.cfg]();
            };
        };
    };

    const handleConfirm = async () => {
        const operations = [
            builderMaintenanceSave(originalMaintenance, maintenance)
        ];

        const request = operations
            .filter((operation): operation is SettingsSaveOperation => operation !== null)
            .map((operation) => 
                Request.patch(
                    operation.endpoint,
                    operation.payload
                )
            );

        const results = await Promise.allSettled(request);

        const errors = [];
        const generalErrors = [];
        const normalizedErrors = [];

        for(const result of results) {
            if(result.status === "rejected") {
                generalErrors.push({
                    message: "Falha de conexão ao salvar uma ou mais configurações. O resultado do salvamento pode ser desconhecido."
                });

                continue;
            };

            const res = result.value;

            if(res.ok && res.data.errors.length > 0) {
                errors.push(...res.data.errors.map((error: ApiError) => ({
                    message: error.message,
                    group: error.key.split(".")[0],
                    cfg: error.key.split(".")[1]
                })));

                handleCfgSuccess(res.data.successes);

                continue;
            };

            if(res.ok) {
                handleCfgSuccess(res.data.successes);
            };

            if(res.status === 400) {
                generalErrors.push(...res.data.errors.map((error: ApiError) => ({
                    message: error.message
                })));

                continue;
            };

            if(res.status === 404) {
                generalErrors.push({ message: res.data.message });

                const notFound: CfgFailure[] = []

                for(const key of res.data.keys) {
                    const [group, cfg] = key.split(".");

                    notFound.push({group, cfg});
                };

                handleCfgFailure(notFound);

                continue;
            };

            if(res.status === 500) {
                if(res.data.errors && res.data.errors.length > 0) {
                    errors.push(...res.data.errors.map((error: ApiError) => ({
                        message: error.message,
                        group: error.key.split(".")[0],
                        cfg: error.key.split(".")[1]
                    })));
                };

                if(res.data.successes && res.data.successes.length > 0) {
                    handleCfgSuccess(res.data.successes)
                }

                if(!res.data.successes?.length && !res.data.errors?.length) {
                    generalErrors.push({ message: res.data.message });
                }

                continue;
            };
        };

        if(generalErrors.length > 0) {
            normalizedErrors.push(...generalErrors.map((error) => ({message: error.message})));
        };

        if(errors.length > 0) {
            handleCfgFailure(errors.map((error) => ({group: error.group, cfg: error.cfg})));

            normalizedErrors.push(...errors.map((error) => ({message: error.message})))
        };

        if(normalizedErrors.length > 0) {
            showMessageModal({
                data: {
                    type: "error",
                    description: normalizedErrors.length === 1 
                        ? "A configuração não foi salva."
                        : "Uma ou mais configurações não foram salvas.",
                    list: normalizedErrors,
                    instructions: "Tente novamente."
                }
            });

            return;
        }

        showToast({
            type: "success",
            text: `Configurações salvas com sucesso.`
        })
    };

    const hasChanges = 
        maintenance.enabled !== originalMaintenance.enabled ||
        maintenance.message !== originalMaintenance.message

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
                                onOriginalChange={setOriginalMaintenance}
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