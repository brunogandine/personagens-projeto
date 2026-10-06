import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import SettingsItem from "./SettingsItem";
import SettingsSectionItemWrapper from "./SettingsSectionItemWrapper";
import { InfoCircleFilled, NotificationFilled, ToolFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Switch } from "antd";
import SettingsItemInfo from "./SettingsItemInfo";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";

const MaintenanceSettings = () => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const { showToast, showMessageModal } = useMessageModal();

    const maintenanceMessageMaxLength = 200;
    const maintenanceMessageLength = maintenanceMessage.length;

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

            setMaintenanceMode(res.data.enabled);
            setMaintenanceMessage(res.data.message);
            
            setLoading(false);
        };

        loadSettings();
    }, []);

    return (
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
                <Switch checked={maintenanceMode} loading={loading} onChange={(checked) => setMaintenanceMode(checked)} />
                <span className={`${styles["settings-item-toggle-info"]}`} style={{backgroundColor: `${maintenanceMode ? 'var(--bg-toggle-active)' : 'var(--bg-toggle-inactive)'}`}}>
                    {maintenanceMode ? "Ativado" : "Desativado"}
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
                    value={maintenanceMessage} 
                    onChange={(e) => setMaintenanceMessage(e.target.value)} 
                />
                <span 
                    style={{alignSelf: "flex-end", fontSize: "12px", opacity: "0",  transition: "opacity 0.2s ease, color 0.2s ease"}} 
                    className={`${maintenanceMessageLength > 75 ? "visible" : ""} ${maintenanceMessageLength >= maintenanceMessageMaxLength ? "error-color" : maintenanceMessageLength >= 150 ? "warning-color" : ""}`} >
                    {maintenanceMessageLength}/{maintenanceMessageMaxLength}
                </span>
            </SettingsItem>
        </SettingsSectionItemWrapper>
    );    
};

export default MaintenanceSettings;