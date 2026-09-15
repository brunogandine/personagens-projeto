import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import SelectedUsersPreview from "./SelectedUsersPreview";
import { Avatar, Modal } from "antd";
import { UserOutlined, WarningFilled } from "@ant-design/icons";
import type { SelectedUserPreview } from "../types/userPreview.types";

type Props = {
    open: boolean;
    onClose: () => void;
    selectedUsers: SelectedUserPreview[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserEditModal = ({open, onClose, selectedUsers}: Props) => {
    const handleClose = () => {
        onClose();
    }

    console.log(selectedUsers)

    const isMultiple = selectedUsers.length > 1;

    return (
        <Modal
            title="Editar Usuário"
            className={`modal-default`}
            closable
            open={open}
            onCancel={handleClose}
            footer={null}
        >
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
                        <div className={`${styles["edit-single-user"]}`}>
                            <div className={`${styles["edit-single-user-info-container"]}`}>
                                <Avatar size={64} icon={<UserOutlined />} src={selectedUsers[0]?.avatar_url ? `${BASE_URL}${selectedUsers[0].avatar_url}` : undefined}/>
                                <div className={`${styles["edit-single-user-info"]}`}>
                                    <div className={`${styles["edit-single-user-item"]} ${styles["username"]}`}>
                                        <span style={{fontWeight: "bold"}}>{selectedUsers[0]?.username}</span>
                                    </div>
                                    <div className={`${styles["edit-single-user-item"], styles["id"]} "item-default"`}>
                                        <span style={{fontSize: "14px"}}>ID de Usuário: </span>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>{selectedUsers[0]?.id}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["edit-single-user-account-info"]}`}>
                                <span style={{fontWeight: "bold"}}>Informações de Conta</span>
                                <div className={`${styles["edit-single-user-account-info-items"]}`}>
                                    <div className={`${styles["edit-single-user-account-info-item"]}`}>
                                        <span style={{fontSize: "14px"}}>Level da Conta: </span>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>{selectedUsers[0]?.level}</span>
                                    </div>
                                    <div className={`${styles["edit-single-user-account-info-item"]}`}>
                                        <span style={{fontSize: "14px"}}>Dinheiro: </span>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>{selectedUsers[0]?.currency}</span>
                                    </div>
                                    <div className={`${styles["edit-single-user-account-info-item"]}`}>
                                        <span style={{fontSize: "14px"}}>Status da Conta: </span>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>{selectedUsers[0]?.active ? "Ativo" : "Inativo"}</span>
                                    </div>
                                </div>
                                <span style={{fontWeight: "bold"}}>Personagens</span>
                                <div className={`${styles["edit-single-user-characters"]}`}>
                                    <div className={`${styles["edit-single-user-characters-info-item"]}`}>
                                        <span style={{fontSize: "14px"}}>Possui: </span>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>0</span>
                                    </div>
                                    <div className={`${styles["edit-single-user-characters-info-item"]}`}>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>[Gerenciar Personagens]</span>
                                    </div>
                                    <div className={`${styles["edit-single-user-characters-info-item"]}`}>
                                        <span style={{fontSize: "14px"}}>Personagens mais usados: </span>
                                    </div>
                                </div>
                                <div className={`${styles["edit-single-user-admin-activity"]}`}>
                                    <span style={{fontWeight: "14px"}}>Log de ações Administrativas </span>
                                    <div className={`${styles["edit-single-user-admin-activity-item"]}`}>
                                        <span style={{fontSize: "14px", fontWeight: "bold"}}>Nenhuma ação administrativa aplicada ao usuário atual.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default UserEditModal;