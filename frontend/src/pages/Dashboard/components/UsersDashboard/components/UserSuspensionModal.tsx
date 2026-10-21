import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import dayjs from "dayjs";
import CustomDurationModal from "./CustomDurationModal";
import SelectedUsersPreview from "./SelectedUsersPreview";
import { Button, Modal, Radio } from "antd";
import { useState } from "react";
import { WarningFilled } from "@ant-design/icons";
import type { CustomDuration } from "../types/punishment.types";
import type { SelectedUserPreview } from "../types/userPreview.types";
import type { CheckboxGroupProps } from "antd/es/checkbox";

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
    const [reason, setReason] = useState<string>("");

    const trimmedReason = reason.trim();

    const isReasonValid = 
        trimmedReason.length > 0 &&
        trimmedReason.length <= 300;

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
        setReason("");
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
            reason: reason.trim(),
            expiresAt
        };

        console.log(payload)
    }

    const options: CheckboxGroupProps<string>["options"] = [
        { label: "Suspender", value: "suspend", id: "suspend" },
        { label: "Banir", value: "ban", id: "ban" }
    ]

    const durationOptions = [
        { label: "1 dia", value: 1, className: `item-default item-select ${duration === 1 ? "selected" : ""}`  },
        { label: "7 dias", value: 7, className: `item-default item-select ${duration === 7 ? "selected" : ""}`  },
        { label: "15 dias", value: 15, className: `item-default item-select ${duration === 15 ? "selected" : ""}`  },
        { label: "30 dias", value: 30, className: `item-default item-select ${duration === 30 ? "selected" : ""}` },
    ];

    if(step === "default")
        return (
            <Modal title="Banir/Suspender Usuários" wrapClassName={`modal-default`} closable open={open} onCancel={handleClose} destroyOnHidden footer={null}>
                <div className={`${styles["options-modal-content"]}`} >
                    <Radio.Group 
                        options={options}
                        value={action}
                        onChange={(e) =>  setAction(e.target.value)}
                        className={"radio-default"}
                    />
                    <SelectedUsersPreview users={selectedUsers} maxVisible={3} />
                    {action === "suspend" && (
                        <>
                            <div className={`${styles["options-modal-suspension-duration"]}`}>
                                <span style={{fontWeight: "bold"}}>Duração da Suspensão: </span>
                                <Radio.Group 
                                    options={durationOptions}
                                    value={duration}
                                    optionType={"button"}
                                    onChange={(e) => handlePreset(e.target.value)}
                                    className={styles["suspension-duration-options"]}
                                />
                                {customDuration ? (
                                    <span style={{height: "100%", lineHeight: "1.18rem"}} className={`item-default item-select ${customDuration ? "selected" : ""}`} onClick={handleCustomModalOpen}>Editar Duração</span> 
                                ) : (
                                    <span style={{height: "100%", lineHeight: "1.18rem"}} className={`item-default item-select`} onClick={handleCustomModalOpen}>Personalizar</span>
                                )}
                            </div>
                            <span className={`est-time`}>Estimativa de Término: <strong>{customDuration 
                                ? dayjs(customDuration?.expiresAt).format("DD/MM/YYYY") 
                                : duration !== null 
                                    ? dayjs().add(duration, "day").format("DD/MM/YYYY") 
                                    : "-"
                                }</strong>
                            </span>
                        </>
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
                                <textarea id="reason" className={`input-text-default`} name="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                                <div className={`reason-footer`}>
                                    <span 
                                        className={`${styles["max-length-reason"]} ${trimmedReason.length > 0 ? "visible" : ""} ${trimmedReason.length >= 300 ? "error-color" : trimmedReason.length >= 250 ? "warning-color" : ""}`}
                                    >
                                        {trimmedReason.length}/300
                                    </span>
                                </div>
                            </div>
                            <div className={`${styles["options-modal-confirmation"]}`}>
                                <Button type="primary" className="btn-default danger-btn" onClick={handlePunishmentConfirm} disabled={!isReasonValid} >
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