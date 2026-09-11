import MessageModal from "@/components/MessageModal/MessageModal";
import { message } from "antd";
import { createContext, useContext, useState } from "react";

type MessageModalData = {
    type: "error" | "warning" | "info";
    description?: string;
    list?: {
        message: string;
    }[];
    instructions?: string;
}

type ToastData = {
    text: string
    type: "info" | "warning" | "error" | "success"
}

type MessageModalContextType = {
    showToast: (data: ToastData) => void;
    showMessageModal: (data: MessageModalData) => void;
    closeMessageModal: () => void;
};

const MessageModalContext = createContext<MessageModalContextType | null>(null);

export const MessageModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState<MessageModalData | null>(null);

    const showToast = (data: ToastData) => {
        message[data.type](data.text, 5);
    }

    const showMessageModal = (data: MessageModalData) => {
        setModalData(data);
        setOpen(true);
    };

    const closeMessageModal = () => {
        setOpen(false);
    };

    return (
        <MessageModalContext.Provider value={{  showToast, showMessageModal, closeMessageModal }}>
            {children}
            <MessageModal 
                type={modalData?.type ?? "info"}
                description={modalData?.description}
                list={modalData?.list}
                instructions={modalData?.instructions}
                open={open}
                onClose={closeMessageModal}
            />
        </MessageModalContext.Provider>
    );
}

export const useMessageModal = () => {
    const ctx = useContext(MessageModalContext);

    if(!ctx) 
        throw new Error("useMessageModal must be used inside MessageModalContextProvider");
    
    return ctx;
}