import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import SelectedUsersPreview from "@/pages/Dashboard/components/UsersDashboard/components/SelectedUsersPreview";
import { useState } from "react";
import { Avatar, Modal } from "antd";
import { CreditCardTwoTone, DollarCircleTwoTone, EditFilled, FileTextOutlined, MinusCircleTwoTone, SafetyOutlined, StarTwoTone, TeamOutlined, UsergroupAddOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";
import type { EditActions, SelectedUserPreview } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import EditUserStep from "./steps/EditUserStep";
import UserEditHeader from "./UserEditHeader";

type Props = {
    open: boolean;
    onClose: () => void;
    selectedUsers: SelectedUserPreview[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserEditModal = ({open, onClose, selectedUsers}: Props) => {
    const [editAction, setEditAction] = useState<EditActions>("edit")

    const goBackAction = () => {
        if(editAction === "character_manager") {
            setEditAction("edit");

            return;
        };
    }

    const handleClose = () => {
        setEditAction("edit");
        onClose();
    };

    const isMultiple = selectedUsers.length > 1;

    const modalTitle: Record<EditActions, string> = {
        "edit": "Editar Usuário",
        "character_manager": "Gerenciar Personagens"
    }

    return (
        <Modal title={<UserEditHeader title={modalTitle[editAction]} step={editAction} goBack={goBackAction}/>} wrapClassName={`modal-default`} closable open={open} onCancel={handleClose} footer={null} >
            <div className={`${styles["edit-modal-content"]}`}>
                {isMultiple ? (
                    <>
                        <SelectedUsersPreview users={selectedUsers} maxVisible={3} />
                        <div className={`${styles["edit-multiple-warning"]}`}>
                            <span style={{fontWeight: "bold"}}>
                                <WarningFilled style={{color: "#faad14", marginRight: "8px"}}/> Algumas opções não estão disponíveis ao editar multiplos usuários.
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${styles["edit-single-user-info-container"]}`}>
                            <Avatar size={64} icon={<UserOutlined />} src={selectedUsers[0]?.avatar_url ? `${BASE_URL}${selectedUsers[0].avatar_url}` : undefined}/>
                            <div className={`${styles["edit-single-user-info-items"]}`}>
                                <div className={`${styles["edit-single-user-item"]} ${styles["username"]}`}>
                                    <span style={{fontWeight: "bold"}}>{selectedUsers[0]?.username}</span>
                                </div>
                                <div className={`${styles["edit-single-user-item"]} ${styles["id"]}`}>
                                    <span style={{fontSize: "14px"}}>ID de Usuário: </span>
                                    <span style={{fontSize: "14px", fontWeight: "bold"}}>{selectedUsers[0]?.id}</span>
                                </div>
                            </div>
                            {editAction === "character_manager" && (
                                <>
                                    <span style={{fontSize: "14px", alignSelf: "center", marginLeft: "auto"}}>Total de Personagens: </span>
                                </>
                            )}
                        </div>
                        {editAction === "edit" && (
                            <EditUserStep users={selectedUsers} characterManagerAction={() => setEditAction("character_manager")}/>
                        )}
                        {editAction === "character_manager" && (
                            <>

                            </>
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
}

export default UserEditModal;