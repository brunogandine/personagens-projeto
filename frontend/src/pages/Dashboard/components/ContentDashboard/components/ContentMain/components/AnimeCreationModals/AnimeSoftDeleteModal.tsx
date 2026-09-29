import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ContentItem from "@/pages/Dashboard/components/ContentDashboard/ContentItem";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { Request } from "@/services/apiClient";
import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { WarningFilled } from "@ant-design/icons";
import type { AnimeDelete } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";

type AnimeDeleteProps = {
    open: boolean;
    onClose: () => void;
    hide: () => void;
    reopen: () => void;
    onSuccessCallback: () => void;
    selectedAnimes: AnimeDelete[] | null;
}

const AnimeSoftDeleteModal = ({open, onClose, hide, reopen, onSuccessCallback, selectedAnimes}: AnimeDeleteProps) => {
    const [step, setStep] = useState<"warning" | "confirmation">("warning");
    const [confirmationText, setConfirmationText] = useState("");

    const { showToast, showMessageModal } = useMessageModal();

    if(selectedAnimes === null) 
        return;

    const isConfirmationValid = 
        confirmationText.trim() === "DELETAR ANIME";

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

        const ids = selectedAnimes.map((a) => a.id);

        const res = await Request.patch("/animes/delete", {
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

        onSuccessCallback();
        handleClose();
    };

    return (
        <Modal
            wrapClassName={`modal-default`}
            title={`Deletar Anime`}
            width={step === "warning" ? "850px" : step === "confirmation" ? "450px" : "850px"}
            open={open}
            onCancel={handleClose}
            footer
        >
            <div className={`${styles["delete-anime-modal-content"]}`}>
                {step === "warning" && (
                    <>
                        <div className={`${styles["delete-anime-warning"]}`} >
                            <span style={{color: "var(--red-300)"}}>
                                <WarningFilled /> Você está tentando deletar os seguintes animes:
                            </span>
                        </div>
                        <div className={`${styles["delete-anime-selected"]}`} >
                            {selectedAnimes.map((anime) => (
                                <ContentItem key={anime.id} item={anime} type={"anime"} hoverable={false} />
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
                        <div className={`${styles["delete-anime-confirmation"]}`} >
                            <span>
                                <WarningFilled /> Digite o texto a seguir para confirmar a ação:
                            </span>
                            <span style={{color: "var(--orange-500)", alignSelf: "center"}}>DELETAR ANIME</span>
                        </div>
                        <div className={`${styles["delete-anime-confirmation-input"]}`}>
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

export default AnimeSoftDeleteModal;