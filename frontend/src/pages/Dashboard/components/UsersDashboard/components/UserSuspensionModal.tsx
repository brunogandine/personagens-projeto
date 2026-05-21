import { Avatar, Button, Modal, Tooltip } from "antd"
import styles from "../../../Dashboard.module.css"
import { useState } from "react";
import { WarningFilled, UserOutlined } from "@ant-design/icons";
import CustomDurationModal from "./CustomDurationModal";
import type { CustomDuration } from "../types/punishment";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type SelectedUserPreview = {
    id: number;
    username: string;
    avatar_url: string | null;
}

type Props = {
    open: boolean;
    onClose: () => void;
    selectedUsers: SelectedUserPreview[];
}

const UserSuspensionModal = ({open, onClose, selectedUsers}: Props) => {
    const [step, setStep] = useState<"default" | "customDuration">("default");
    const [action, setAction] = useState<"suspend" | "ban" | null>(null);
    const [duration, setDuration] = useState<number | null>(1);
    const [customDuration, setCustomDuration] = useState<CustomDuration | null>(null);

    const handleCustomModalOpen = () => {
        setStep("customDuration");
    };

    const handleCustomModalClose = () => {
        setStep("default");
    };

    const handleCustomDurationConfirm = (duration: CustomDuration) => {
        setCustomDuration(duration);
        setDuration(null);

        setStep("default");
    }

    const handlePreset = (duration: number) => {
        setDuration(duration);
        setCustomDuration(null);
    }

    const handleClose = () => {
        resetState();
        onClose();
    }

    const resetState = () => {
        setAction(null);
        setDuration(1);
        setCustomDuration(null);
    }

    const handlePunishmentConfirm = async () => {
        if(!action)
            return;

        let expiresAt: Date | null = null;

        if(action === "suspend" && duration) {
            expiresAt = dayjs().add(duration, "day").toDate();
        };

        if(action === "suspend" && customDuration) {
            expiresAt = customDuration.expiresAt;
        };

        const payload = {
            userIds: selectedUsers.map(user => user.id),
            action,
            expiresAt
        };
    }

    const visibleUsers = selectedUsers.slice(0, 3);
    const overflowUsers = selectedUsers.length - 3

    if(step === "default")
        return (
            <Modal title="Banir/Suspender Usuários" className={`modal-default`} closable open={open} onCancel={handleClose} destroyOnHidden footer={null}>
                <div className={`${styles["options-modal-content"]}`} >
                    <div className={`${styles["options-modal-action"]}`}>
                        <input type="radio" id="suspend" name="action" value="suspend" onChange={() => setAction("suspend")} checked={action === "suspend"} />
                        <label htmlFor="suspend">Suspender</label>
                        <input type="radio" id="ban" name="action" value="ban" onChange={() => setAction("ban")} checked={action === "ban"} />
                        <label htmlFor="ban">Banir</label>
                    </div>
                    <div className={`${styles["options-modal-user-list"]}`}>
                        {visibleUsers.map((user) => (
                            <Tooltip title={user.username} destroyOnHidden={true}>
                                <div className={`${styles["users-selected"]}`}>
                                    <Avatar size={22} style={{flexShrink: "0"}} src={user.avatar_url ? `${BASE_URL}${user.avatar_url}` : undefined} icon={<UserOutlined ></UserOutlined>} />
                                    <div className={`${styles["suspension-user-name"]}`}>
                                        {user.username}
                                    </div>
                                </div>
                            </Tooltip>
                        ))}
                        {overflowUsers > 0 && (
                            <div className={`${styles["users-overflow"]}`}>
                                +{overflowUsers} Selecionados
                            </div>
                        )}
                    </div>
                    {action === "suspend" && (
                        <div className={`${styles["options-modal-suspension-duration"]}`}>
                            <span style={{fontWeight: "bold"}}>Duração da Suspensão: </span>
                            <div className={`${styles["suspension-duration-options"]}`}>
                                <input type="radio" id="duration-1" name="duration" value="1" checked={duration === 1} onChange={() => handlePreset(1)} />
                                <label htmlFor="duration-1" className={duration === 1 ? `${styles["selected"]}` : ""}>1 dia</label>
                                <input type="radio" id="duration-7" name="duration" value="7" checked={duration === 7} onChange={() => handlePreset(7)} />
                                <label htmlFor="duration-7" className={duration === 7 ? `${styles["selected"]}` : ""}>7 dias</label>
                                <input type="radio" id="duration-15" name="duration" value="15" checked={duration === 15} onChange={() => handlePreset(15)} />
                                <label htmlFor="duration-15" className={duration === 15 ? `${styles["selected"]}` : ""}>15 dias</label>
                                <input type="radio" id="duration-30" name="duration" value="30" checked={duration === 30} onChange={() => handlePreset(30)} />
                                <label htmlFor="duration-30" className={duration === 30 ? `${styles["selected"]}` : ""}>30 dias</label>
                            </div>
                            <span className={`${styles["suspension-duration-custom"]}`} onClick={handleCustomModalOpen}>Personalizar</span>
                        </div>  
                    )}
                    {action === "ban" && (
                        <div className={`${styles["options-modal-ban-default"]}`}>
                            <span style={{fontWeight: "bold"}}><WarningFilled style={{color: "yellow"}}/> Esta ação é permanente até reversão manual.</span>
                        </div>
                    )}

                    {action && (
                        <>
                            <div className={`${styles["options-modal-reason-input"]}`}>
                                <label htmlFor="reason">Motivo: </label>
                                <textarea name="reason"/>
                            </div>
                            <div className={`${styles["options-modal-confirmation"]}`}>
                                <Button type="primary" className="btn-default danger-btn" onClick={handlePunishmentConfirm} >
                                    Aplicar Punição
                                </Button>
                                <Button type="primary" className="btn-default cancel-btn" onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </div>
                        </>
                    )}
                    
                </div>
            </Modal>
        );

    if(step === "customDuration")
        return (
            <CustomDurationModal
                open={step === "customDuration"}
                onClose={handleCustomModalClose}
                onConfirm={handleCustomDurationConfirm}
            />
        )
}

export default UserSuspensionModal;