import styles from "@/pages/Dashboard/Dashboard.module.css";
import { Modal } from "antd";

type CharacterPreviewModalProps = {
    open: boolean
    onClose: () => void
}

const CharacterPreviewModal = ({open, onClose}:  CharacterPreviewModalProps) => {

    return (
        <Modal
            className={`modal-default`}
            title="Resumo do Personagem"
            open={open}
            onCancel={onClose}
            footer
        >
            <div>Teste</div>
        </Modal>
    )
};

export default CharacterPreviewModal;