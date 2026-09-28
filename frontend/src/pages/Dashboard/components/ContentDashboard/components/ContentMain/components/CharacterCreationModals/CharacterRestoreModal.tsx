import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ContentItem from "@/pages/Dashboard/components/ContentDashboard/ContentItem";
import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { CharacterRestore } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { Request } from "@/services/apiClient";

type RestoreCharacterProps = {
    open: boolean;
    onClose: () => void;
    hide: () =>  void;
    reopen: () => void;
    onSuccessCallback: () => void;
    selectedCharacters: CharacterRestore[] | null;
}

const CharacterRestoreModal = ({open, onClose, hide, reopen, onSuccessCallback, selectedCharacters}: RestoreCharacterProps) => {
    const { showToast, showMessageModal } = useMessageModal();

    if(!selectedCharacters)
        return;

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = async () => {
        const ids = selectedCharacters.map((c) => c.id);

        const res = await Request.patch("/characters/restore", {
            ids
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
            title={"Restaurar Personagem"}
            width={"850px"}
            open={open}
            onCancel={handleClose}
            footer
        >
            <div className={`${styles["restore-character-modal-content"]}`}>
                <div className={`${styles["restore-character-warning"]}`} >
                    <span style={{color: "var(--yellow-300)"}}>
                        <ExclamationCircleFilled /> Você está tentando deletar os seguintes personagens:
                    </span>
                </div>
                <div className={`${styles["restore-character-selected"]}`} >
                    {selectedCharacters.map((character) => (
                        <ContentItem key={character.id} item={character} type={"character"} hoverable={false} />
                    ))}
                </div>
                <div className={`modal-options`} >
                    <Button type="primary" className={`btn-default danger-btn`} onClick={handleConfirm} >Confirmar</Button>
                    <Button type="primary" className={`btn-default primary-btn`} onClick={handleClose} >Cancelar</Button>
                </div>  
            </div>
        </Modal>
    )
};

export default CharacterRestoreModal;