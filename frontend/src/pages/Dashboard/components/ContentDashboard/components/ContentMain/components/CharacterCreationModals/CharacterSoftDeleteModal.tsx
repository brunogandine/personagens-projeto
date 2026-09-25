import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ContentItem from "@/pages/Dashboard/components/ContentDashboard/ContentItem";
import { Button, Input, Modal } from "antd";
import { WarningFilled } from "@ant-design/icons";
import { useState } from "react";
import type { CharacterDelete } from "../../../../types/content.types";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { Request } from "@/services/apiClient";

type CharacterDeleteProps = {
    open: boolean;
    onClose: () => void;
    hide: () =>  void;
    reopen: () => void;
    onSuccess: () => void;
    selectedCharacters: CharacterDelete[] | null;
}

const CharacterSoftDeleteModal = ({open, onClose, hide, reopen, onSuccess, selectedCharacters}: CharacterDeleteProps) => {
    const [step, setStep] = useState<"warning" | "confirmation">("warning");
    const [confirmationText, setConfirmationText] = useState("");

    const { showToast, showMessageModal } = useMessageModal();

    if(selectedCharacters === null) 
        return;

    const isConfirmationValid = 
        confirmationText.trim() === "DELETAR PERSONAGEM";

    const handleStep = () => {
        if(step === "confirmation") {
            setStep("warning");
            setConfirmationText("");

            return;
        };

        setStep("confirmation");
    };

    const handleClose = () => {
        setStep("warning");
        setConfirmationText("");
        onClose();
    };

    const handleDelete = async () => {
        if(!isConfirmationValid) {
            showToast({
                type: "warning",
                text: "Texto de confirmação incorreto."
            });

            return;
        };

        const ids = selectedCharacters.map((c) => c.id);

        const res = await Request.patch("/characters/delete", {
            ids,
            confirmationText
        });

        if(!res.ok) {
            if(res.status === 400) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };

            if(res.status === 404) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };

            if(res.status === 409) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };

            if(res.status === 500) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message,
                        instructions: "Tente novamente mais tarde."
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };
        };

        showToast({
            type: "success", 
            text: res.data.message, 
        });

        onSuccess();
        handleClose();
    };

    return (
        <Modal
            wrapClassName={`modal-default`}
            title={`Deletar Personagem`}
            width={step === "warning" ? "850px" : step === "confirmation" ? "450px" : "850px"}
            open={open}
            onCancel={handleClose}
            footer
        >
            <div className={`${styles["delete-character-modal-content"]}`}>
                {step === "warning" && (
                    <>
                        <div className={`${styles["delete-character-warning"]}`} >
                            <span style={{color: "var(--red-300)"}}>
                                <WarningFilled /> Você está tentando deletar os seguintes personagens:
                            </span>
                        </div>
                        <div className={`${styles["delete-character-selected"]}`} >
                            {selectedCharacters.map((character) => (
                                <ContentItem key={character.id} item={character} type={"character"} hoverable={false} />
                            ))}
                        </div>
                        <div className={`modal-options`} >
                            <Button type="primary" className={`btn-default danger-btn`} onClick={handleStep} >Continuar</Button>
                            <Button type="primary" className={`btn-default primary-btn`} onClick={handleClose} >Cancelar</Button>
                        </div>  
                    </>
                )}
                {step === "confirmation" && (
                    <>
                        <div className={`${styles["delete-character-confirmation"]}`} >
                            <span>
                                <WarningFilled /> Digite o texto a seguir para confirmar a ação:
                            </span>
                            <span style={{color: "var(--orange-500)", alignSelf: "center"}}>DELETAR PERSONAGEM</span>
                        </div>
                        <div className={`${styles["delete-character-confirmation-input"]}`}>
                            <Input className={`field-default`} value={confirmationText} onChange={(e) => setConfirmationText(e.target.value)} />
                        </div>
                        <div className={`modal-options`} >
                            <Button type="primary" className={`btn-default danger-btn`} onClick={handleDelete} disabled={!isConfirmationValid} >Confirmar</Button>
                            <Button type="primary" className={`btn-default primary-btn`} onClick={handleClose} >Cancelar</Button>
                            <Button type="primary" className={`btn-default`} onClick={handleStep}>Voltar</Button>
                        </div>                    
                    </>  
                )}
            </div>
        </Modal>
    );
};

export default CharacterSoftDeleteModal;