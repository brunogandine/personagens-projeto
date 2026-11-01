import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import SelectedUsersPreview from "@/pages/Dashboard/components/UsersDashboard/components/SelectedUsersPreview";
import EditUserStep from "./steps/EditUserStep";
import UserEditHeader from "./UserEditHeader";
import { useState } from "react";
import { Avatar, Modal } from "antd";
import { UserOutlined, WarningFilled } from "@ant-design/icons";
import type { EditActions, SelectedUserPreview } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import CharacterManagerStep from "./steps/CharacterManagerStep";

type Props = {
    open: boolean;
    onClose: () => void;
    selectedUsers: SelectedUserPreview[];
    onOpenCharacterConfig: () => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserEditModal = ({open, onClose, selectedUsers, onOpenCharacterConfig}: Props) => {
    const [editAction, setEditAction] = useState<EditActions>("edit")

    const goBackAction = () => {
        setEditAction("edit");
    }

    const handleClose = () => {
        setEditAction("edit");
        onClose();
    };

    const selectedUser = selectedUsers[0];
    const isMultiple = selectedUsers.length > 1;

    const modalTitle: Record<EditActions, string> = {
        "edit": "Editar Usuário",
        "character_manager": "Gerenciar Personagens"
    }

    return (
        <Modal title={<UserEditHeader title={modalTitle[editAction]} step={editAction} goBack={goBackAction}/>} wrapClassName={`modal-default`} width={"fit-content"} closable open={open} onCancel={handleClose} footer={null} >
            <div className={`${styles["edit-modal-content"]}`}>
                {isMultiple ? (
                    <>
                        <SelectedUsersPreview users={selectedUsers} maxVisible={3} />
                        <div className={`${styles["edit-multiple-warning"]}`}>
                            <span style={{fontWeight: "bold"}}>
                                <WarningFilled style={{color: "#faad14", marginRight: "8px"}}/>Algumas opções não estão disponíveis ao editar multiplos usuários.
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${styles["edit-single-user-info-container"]}`}>
                            <Avatar size={64} icon={<UserOutlined />} src={selectedUser.avatar_url ? `${BASE_URL}${selectedUser.avatar_url}` : undefined}/>
                            <div className={`${styles["edit-single-user-info-items"]}`}>
                                <div className={`${styles["edit-single-user-item"]} ${styles["username"]}`}>
                                    <span style={{fontWeight: "bold"}}>{selectedUser.username}</span>
                                </div>
                                <div className={`${styles["edit-single-user-item"]} ${styles["id"]}`}>
                                    <span style={{fontSize: "14px"}}>ID de Usuário: </span>
                                    <span style={{fontSize: "14px", fontWeight: "bold"}}>{selectedUser.id}</span>
                                </div>
                            </div>
                            {editAction === "character_manager" && (
                                <>
                                    <span style={{fontSize: "14px", fontWeight: "bold", alignSelf: "center", marginLeft: "auto"}}>Total de Personagens: <span style={{color: "#7385ff"}}>{selectedUser.characters_count}</span></span>
                                </>
                            )}
                        </div>
                        {editAction === "edit" && (
                            <EditUserStep user={selectedUser} characterManagerAction={() => setEditAction("character_manager")}/>
                        )}
                        {editAction === "character_manager" && (
                            <CharacterManagerStep userId={selectedUser.id} count={selectedUser.characters_count} onOpenCharacterConfig={onOpenCharacterConfig} />
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
}

export default UserEditModal;