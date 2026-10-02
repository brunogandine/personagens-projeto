import styles from "@/pages/Dashboard/components/SettingsDashboard/SettingsContainer.module.css";
import { HddFilled, InfoCircleFilled, NotificationFilled, SettingFilled, ToolOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { useState } from "react";

const SettingsContent = () => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState<string>("");

    const maintenanceMessageMaxLength = 200;
    const maintenanceMessageLength = maintenanceMessage.length;

    return (
        <>
            <section className={`${styles["settings-header"]}`}>
                <SettingFilled style={{ fontSize: '1.7rem' }} />
                <div className={`${styles["settings-header-line"]}`}>
                    <h1>Configurações</h1>
                    <span style={{fontSize: `0.85rem`}}>Gerencie as regras e comportamentos do sistema.</span>
                </div>
            </section>
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
                        <div className={`${styles["settings-section-item-wrapper"]}`}>
                            <div className={`${styles["settings-section-item"]}`}>
                                <div className={`${styles["settings-item"]}`}>
                                    <div className={`${styles["settings-item-header"]}`}>
                                        <ToolOutlined style={{fontSize: `1.5rem`}} />
                                        <div className={`${styles["settings-item-header-line"]}`}>
                                            <h1>Modo de Manutenção</h1>
                                            <span style={{fontSize: `0.85rem`}}>Impede o acesso ao sistema enquanto estiver ativado.</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["settings-item-content"]}`}>
                                        <Switch checked={maintenanceMode} onChange={(checked) => setMaintenanceMode(checked)} />
                                        <span className={`${styles["settings-item-toggle-info"]}`} style={{backgroundColor: `${maintenanceMode ? 'var(--bg-toggle-active)' : 'var(--bg-toggle-inactive)'}`}}>
                                            {maintenanceMode ? "Ativado" : "Desativado"}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles["settings-item"]} ${styles["flex-column"]}`}>
                                    <div className={`${styles["settings-item-header"]}`}>
                                        <NotificationFilled style={{fontSize: `1.5rem`}} />
                                        <div className={`${styles["settings-item-header-line"]}`}>
                                            <h1>Mensagem de Manutenção</h1>
                                            <span style={{fontSize: `0.85rem`}}>Mensagem de Manutenção exibida aos usuários durante a manutenção.</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["settings-item-content"]}`}>
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
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["settings-section-item-info"]}`}>
                                <div className={`${styles["settings-item-info-header"]}`}>
                                    <InfoCircleFilled style={{fontSize: `1.5rem`}} />
                                    <div className={`${styles["settings-item-info-header-line"]}`}>
                                        <h1>Sobre a manutenção</h1>
                                    </div>
                                </div>
                                <div className={`${styles["settings-item-info-content"]}`}>
                                    <span style={{fontSize: `0.85rem`, color: `var(--text-color-primary)`}}>
                                        <p>Quando o modo de manutenção está ativado, os usuários não poderão acessar o sistema, exceto administradores.</p>
                                        <p>Use essa opção em casos de atualizações, correções ou indisponibilidade temporária.</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["settings-section-item-wrapper"]}`}>
                            <div className={`${styles["settings-section-item"]}`}>
                                <div className={`${styles["settings-item"]}`}>
                                    <div className={`${styles["settings-item-header"]}`}>
                                        <ToolOutlined style={{fontSize: `1.5rem`}} />
                                        <div className={`${styles["settings-item-header-line"]}`}>
                                            <h1>Modo de Manutenção</h1>
                                            <span style={{fontSize: `0.85rem`}}>Impede o acesso ao sistema enquanto estiver ativado.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>          
                </section>
            </section>
        </>
    );
};

export default SettingsContent;