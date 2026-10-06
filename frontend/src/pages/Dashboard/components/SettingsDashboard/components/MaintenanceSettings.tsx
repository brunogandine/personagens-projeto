import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import SettingsItem from "./SettingsItem";
import SettingsSectionItemWrapper from "./SettingsSectionItemWrapper";
import SettingsItemInfo from "./SettingsItemInfo";
import { InfoCircleFilled, NotificationFilled, ToolFilled } from "@ant-design/icons";
import { Switch } from "antd";
import type { MaintenanceSettingsState } from "@/pages/Dashboard/components/SettingsDashboard/types/settings.types";

type MaintenanceSettingsProps = {
    settings: MaintenanceSettingsState;
    loading: boolean;
    onChange: (settings: MaintenanceSettingsState) => void;
}

const MaintenanceSettings = ({settings, loading, onChange}: MaintenanceSettingsProps) => {
    const messageMaxLength = 200;
    const messageLength = settings.message.length;

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
                    title={`Modo de Manutenção`}
                    description={`Impede o acesso ao sistema enquanto estiver ativado.`}

                >
                    <Switch 
                        checked={settings.enabled} 
                        loading={loading} 
                        onChange={(enabled) => { onChange({
                                    ...settings, 
                                    enabled 
                                })}
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
                    className={styles["flex-column"]}
                >
                    <textarea 
                        name="maintenance-message" 
                        className={`input-text-default`} 
                        placeholder="Digite a mensagem de manutenção..." 
                        value={settings.message} 
                        onChange={(e) => {onChange({
                            ...settings,
                            message: e.target.value
                        })}} 
                    />
                    <span 
                        style={{alignSelf: "flex-end", fontSize: "12px", opacity: "0",  transition: "opacity 0.2s ease, color 0.2s ease"}} 
                        className={`${messageLength > 75 ? "visible" : ""} ${messageLength >= messageMaxLength ? "error-color" : messageLength >= 150 ? "warning-color" : ""}`} >
                        {messageLength}/{messageMaxLength}
                    </span>
                </SettingsItem>
            </SettingsSectionItemWrapper>
        </>
    );    
};

export default MaintenanceSettings;