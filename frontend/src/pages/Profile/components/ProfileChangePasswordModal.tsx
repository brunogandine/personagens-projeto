import { Button, Input, Modal } from "antd";
import styles from "../Profile.module.css"
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

type ProfileChangePasswordProps = {
    open: boolean;
    onClose: () => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL

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
            const res = await fetch(`${BASE_URL}/api/users/me/password`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            });

            if(!res.ok) {
                if(res.status === 401) {
                    alert("Sua sessão expirou. Faça login novamente.");
                    window.location.href = "/";
                }

                const errorData = await res.json();

                if (errorData.errors) {
                    const formattedErrors: Record<string, string> = {};

                    errorData.errors.forEach((err: { field: string, message: string}) => {
                        formattedErrors[err.field] = err.message;
                        
                        setErrors(formattedErrors);
                    });
                };

                throw new Error("Erro ao atualizar a senha.")
            };

            if(!res.ok) {
                const errorData = await res.json();

                if (errorData.errors) {
                    const formattedErrors: Record<string, string> = {};

                    errorData.errors.forEach((err: { field: string, message: string}) => {
                        formattedErrors[err.field] = err.message;
                        
                        setErrors(formattedErrors);
                    });
                };

                return;
            };

            const data = await res.json();

            setErrors({});
            setSuccess(data);

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
                className={`${styles['changePass-modal']}`}
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
                            <span style={{color: "#C1C1C1", fontSize: "14px", fontWeight: "bold"}}>Nova senha <span style={{color: "#FF6363"}}>*</span></span>
                            <Input.Password className={errors.newPassword && `${styles['error-input']}`} name="newPassword" value={newPassword} onChange={(e) =>  setNewPassword(e.target.value)} visibilityToggle={false}/>
                            {errors.newPassword && <p className="error-message lightRed" ><ExclamationCircleFilled style={{marginRight: 6}}/>{errors.newPassword}</p>}
                        </div>
                        <div className={`${styles["input-pass-container"]}`}>
                            <span style={{color: "#C1C1C1", fontSize: "14px",fontWeight: "bold"}}>Confirmar nova senha <span style={{color: "#FF6363"}}>*</span></span>
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
                        <Button className={`${styles["cancel-btn"]}`} onClick={handleFormCancel}>Cancelar</Button>
                        <Button className={`${styles["apply-btn"]}`} htmlType="submit" form={`change-password`}>Pronto</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProfileChangePasswordModal;