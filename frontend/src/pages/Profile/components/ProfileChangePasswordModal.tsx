import { Button, Input, Modal } from "antd";
import styles from "../Profile.module.css"
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Request } from "@/services/apiClient";

type ProfileChangePasswordProps = {
    open: boolean;
    onClose: () => void;
};

const ProfileChangePasswordModal = ({ open, onClose }: ProfileChangePasswordProps) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const payload = {
            currentPassword: String(formData.get("currentPassword") || ""),
            newPassword: String(formData.get("newPassword") || ""),
            confirmNewPassword: String(formData.get("confirmNewPassword") || "")
        };

        try {
            const res = await Request.patch(
                `/users/me/password`,
                payload
            );

            if(!res)
                throw new Error(`Falha ao atualizar a senha.`)

            if(!res.ok) {
                if (res.data.errors) {
                    const formattedErrors: Record<string, string> = {};

                    res.data.errors.forEach((err: { field: string, message: string}) => {
                        formattedErrors[err.field] = err.message;
                        
                        setErrors(formattedErrors);
                    });
                };

                throw new Error("Erro ao atualizar a senha.")
            };

            setErrors({});
            setSuccess(res.data);

            setTimeout(() => {
                setSuccess("");
            }, 4600);

            resetFormValues();
        } catch(err) {
            console.error(err)
        };
    }

    const resetFormValues = () => {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
    }

    const resetErrors = () => {
        setErrors({});
    }

    const handleFormCancel = () => {
        resetErrors();
        resetFormValues();
        onClose();
    }

    return (
        <>
            <Modal 
                className={`modal-default`}
                title="Atualize sua senha" 
                open={open} 
                closable 
                onCancel={handleFormCancel} 
                footer={null}
            >
                <div className={`${styles["changePass-container"]}`}>
                    <form id="change-password" onSubmit={handleSubmit}>
                        <span style={{color: "#8A8A8A", fontWeight: "bold", }}>Insira sua senha atual e uma nova senha.</span>
                        <div className={`${styles["input-pass-container"]}`}>
                            <span style={{color: "#C1C1C1", fontSize: "14px",fontWeight: "bold"}}>Senha atual <span style={{color: "#FF6363"}}>*</span></span>
                            <Input.Password className={errors.currentPassword && `${styles['error-input']}`} name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} visibilityToggle={false}/>
                            {errors.currentPassword && <p className="error-message lightRed" ><ExclamationCircleFilled style={{marginRight: 6}}/>{errors.currentPassword}</p>}
                        </div>
                        <div className={`${styles["input-pass-container"]}`}>
                            <span style={{color: "#C1C1C1", fontSize: "14px", fontWeight: "bold"}}>Nova senha <span className="lightRed" >*</span></span>
                            <Input.Password className={errors.newPassword && `${styles['error-input']}`} name="newPassword" value={newPassword} onChange={(e) =>  setNewPassword(e.target.value)} visibilityToggle={false}/>
                            {errors.newPassword && <p className="error-message lightRed" ><ExclamationCircleFilled style={{marginRight: 6}}/>{errors.newPassword}</p>}
                        </div>
                        <div className={`${styles["input-pass-container"]}`}>
                            <span style={{color: "#C1C1C1", fontSize: "14px",fontWeight: "bold"}}>Confirmar nova senha <span className="lightRed">*</span></span>
                            <Input.Password className={errors.confirmNewPassword && `${styles['error-input']}`} name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} visibilityToggle={false}/>
                            {errors.confirmNewPassword && <p className="error-message lightRed" ><ExclamationCircleFilled style={{marginRight: 6}}/>{errors.confirmNewPassword}</p>}
                        </div>
                    </form>
                    <div className={`${styles["success-message-container"]}`}>
                        {success && (
                            <p className="success-message lightGreen" ><ExclamationCircleFilled style={{marginRight: 6}}/>{success}</p>
                        )}
                    </div>
                    <div className={`${styles["btn-wrapper"]}`}>
                        <Button type="primary" className={`btn-default cancel-btn ${styles["avatar-btn"]}`} onClick={handleFormCancel}>Cancelar</Button>
                        <Button type="primary" className={`btn-default primary-btn ${styles["avatar-btn"]}`} htmlType="submit" form={`change-password`}>Pronto</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProfileChangePasswordModal;