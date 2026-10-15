import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import SettingsItem from "./SettingsItem";
import SettingsSectionItemWrapper from "./SettingsSectionItemWrapper";
import SettingsItemInfo from "./SettingsItemInfo";
import { InfoCircleFilled, NotificationFilled, ToolFilled } from "@ant-design/icons";
import { Switch } from "antd";
import type { MaintenanceSettingsState } from "@/pages/Dashboard/components/SettingsDashboard/types/settings.types";
import { Request } from "@/services/apiClient";
import { useEffect, useState } from "react";

type MaintenanceSettingsProps = {
    settings: MaintenanceSettingsState;
    onOriginalChange: (settings: MaintenanceSettingsState) => void;
    onChange: (settings: MaintenanceSettingsState) => void;
    onFail: (message: string) => void;
}

const MaintenanceSettings = ({settings, onOriginalChange, onChange, onFail}: MaintenanceSettingsProps) => {
    const [loading, setLoading] = useState(true);

    const messageMaxLength = 200;
    const messageLength = settings.message?.length;

    useEffect(() => {
        const loadSettings = async () => {
            const res = await Request.get("/settings/maintenance");

            if(!res.ok) {
                if(res.status === 404) {
                    onFail("Não foram encontradas configurações no banco relacionadas a Manutenção.");

                    setLoading(false);

                    return;
                };

                if(res.status === 500) {
                    onFail("Não foi possível obter as configurações. Provavelmente foi um erro interno.");

                    setLoading(false);

                    return;
                };
            };

            const settings = {
                enabled: res.data.enabled ?? null,
                message: res.data.message ?? null
            };

            onOriginalChange(settings);
            onChange(settings);

            setLoading(false);
        };

        loadSettings();
    }, []);

    return (
        <>
            <SettingsSectionItemWrapper
                info={            
                    <SettingsItemInfo 
                        icon={<InfoCircleFilled />}
                        title={`Sobre a manutenção.`}
                    >
                        <span style={{fontSize: `0.85rem`, color: `var(--text-color-primary)`}}>
                            <p>Quando o modo de manutenção está ativado, os usuários não poderão acessar o sistema, exceto administradores.</p>
                            <p>Use essa opção em casos de atualizações, correções ou indisponibilidade temporária.</p>
                        </span>
                    </SettingsItemInfo>
                }
            >
                <SettingsItem 
                    icon={<ToolFilled />}
                    className={settings.enabled !== null ? "" : loading ? "" : `${styles["disabled-overlay"]}`}
                    title={`Modo de Manutenção`}
                    description={`Impede o acesso ao sistema enquanto estiver ativado.`}

                >
                    <Switch 
                        checked={settings.enabled ?? false} 
                        loading={loading} 
                        onChange={(enabled) => { 
                                if(settings.enabled === null) {
                                    return;
                                }

                                onChange({
                                    ...settings, 
                                    enabled 
                                })
                            }
                        } 
                        />
                    <span className={`${styles["settings-item-toggle-info"]}`} style={{backgroundColor: `${settings.enabled ? 'var(--bg-toggle-active)' : 'var(--bg-toggle-inactive)'}`}}>
                        {settings.enabled ? "Ativado" : "Desativado"}
                    </span>
                </SettingsItem>
                <SettingsItem 
                    icon={<NotificationFilled />}
                    title={`Mensagem de Manutenção`}
                    description={`Mensagem exibida aos usuários durante a manutenção.`}
                    className={`${styles["flex-column"]} ${settings.message !== null ? "" : loading ? "" : `${styles["disabled-overlay"]}`}`}
                >
                    <textarea 
                        name="maintenance-message" 
                        className={`input-text-default`} 
                        placeholder="Digite a mensagem de manutenção..." 
                        value={settings.message ?? ""} 
                        onChange={(e) => {
                            if(settings.message === null)
                                return;

                            onChange({
                                ...settings,
                                message: e.target.value
                            })
                        }
                    } 
                    />
                    <span 
                        style={{alignSelf: "flex-end", fontSize: "12px", opacity: "0",  transition: "opacity 0.2s ease, color 0.2s ease"}} 
                        className={`${messageLength !== undefined ? messageLength > 75 ? "visible" : "" : ""} ${messageLength !== undefined ? messageLength >= messageMaxLength ? "error-color" : messageLength >= 150 ? "warning-color" : "" : ""}`} >
                        {messageLength}/{messageMaxLength}
                    </span>
                </SettingsItem>
            </SettingsSectionItemWrapper>
        </>
    );    
};

export default MaintenanceSettings;