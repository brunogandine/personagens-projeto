import { Modal } from "antd";

type MessageModalProps ={
    type: "error" | "warning" | "info";
    open: boolean;
    description?: string;
    list?: {
        message: string;
    }[];
    instructions?: string;
    onClose: () => void;
};

const modalTypePlaceholder = {
    "error": {
        title: "Problema",
        className: "modal-error"
    },
    "warning": {
        title: "Aviso",
        className: "modal-warning"
    },
    "info": {
        title: "Informação",
        className: "modal-info"
    }
}

const MessageModal = ({ type, open, description, list, instructions, onClose }: MessageModalProps) => {
    return (
        <Modal
            wrapClassName={modalTypePlaceholder[type].className}
            title={modalTypePlaceholder[type].title}
            open={open}
            onCancel={onClose}
            footer={null}
        >
            {description && <p style={{ fontWeight: "bold" }}>{description}</p>}
            {list && (
                <ul>
                    {list.map((item, index) => (
                            <li key={index}>{item.message}</li>
                    ))}
                </ul>
            )}
            {instructions && <p style={{ fontWeight: "bold" }}>{instructions}</p>}
        </Modal>
    )
};

export default MessageModal;