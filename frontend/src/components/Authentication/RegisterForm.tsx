import { useState } from "react";
import styles from "../ui/forms/Form.module.css";
import { Button } from "antd";

const BASE_URL = import.meta.env.VITE_BASE_URL

function RegisterForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const payload = {
            username: formData.get("username"),
            email: formData.get("email"),
            user_key: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        }

        try {
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json();

                if (errorData.errors) {
                    const formattedErrors: Record<string, string> = {};

                    errorData.errors.forEach((err: { field: string, message: string }) => {
                        formattedErrors[err.field] = err.message;
                    })

                    setErrors(formattedErrors);
                };

                return;
            }

            const data = await res.json();
            setErrors({})
            setSuccessMessage("Cadastro realizado com sucesso!");

            setTimeout(() => {
                setSuccessMessage("");
            }, 4600);

            if(data) {
                form.reset();
            }
        } catch (err) {
            console.error("Erro de rede:", err);
        }
    }

    return (
        <div id="signup-form" className={styles["login-register-container"]}>
            <div className={styles["container-title"]}>
                <h2>CADASTRAR</h2>
            </div>
            <div className={styles["form-container"]}>
                <form id="register-form" onSubmit={handleRegister}>
                    <div className={styles["form-group"]}>
                        <input type="text" name="username" placeholder="Nome de Usuário"></input>
                        {errors.username && <p className={`${styles["error-message"]} red`}>{errors.username}</p>}
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="email" name="email" placeholder="Email"></input>
                        {errors.email && <p className="error-message lightRed" >{errors.email}</p>}
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="password" name="password" placeholder="Senha"></input>
                        {errors.user_key && <p className="error-message lightRed" >{errors.user_key}</p>}
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="password" name="confirmPassword" placeholder="Confirmar Senha"></input>
                        {errors.confirmPassword && <p className="error-message lightRed" >{errors.confirmPassword}</p>}
                    </div>
                </form>
                <div className={styles["success-message-container"]}>
                    {successMessage && (
                        <p className={`${styles["success-message"]} green`}>{successMessage}</p>
                    )}
                </div>
                <Button type="primary" className={styles["submit-btn"]} htmlType="submit" form="register-form">Cadastrar</Button>
            </div>
        </div>
    )
}

export default RegisterForm