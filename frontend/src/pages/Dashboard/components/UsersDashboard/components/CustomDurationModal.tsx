import { Modal } from "antd";

type Props = {
    open: boolean;
    onClose: () => void;
}

const CustomDurationModal = ({open, onClose}: Props) => {
    return (
        <Modal
            title="Duração Personalizada"
            className="modal-default"
            closable
            open={open}
            onCancel={onClose}
            footer={null}
        >

        </Modal>
    );
}

export default CustomDurationModal;