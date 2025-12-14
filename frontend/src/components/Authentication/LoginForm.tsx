import styles from "../ui/forms/Form.module.css"
import { useState } from "react";
import { Button } from "antd";
import { useAuth } from "../../contexts/LoggedUserContext";

interface LoginFormValues {
    email: string;
    user_key: string;
}

const initialValues: LoginFormValues = {
    email: "",
    user_key: ""
}

function LoginForm() {

    const [formValues, setFormValues] = useState<LoginFormValues>(initialValues)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { setUser } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            email: formValues.email,
            user_key: formValues.user_key
        }

        try{
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })

            if(!res.ok) {
                const errorData = await res.json();
                
                if(errorData.errors) {
                    const formattedErrors: Record<string, string> = {};

                    errorData.errors.forEach((err: { field: string, message: string }) => {
                        formattedErrors[err.field] = err.message;
                    })

                    setErrors(formattedErrors);
                };

                setFormValues(prev => ({...prev, user_key: ""}));

                return;
            }

            const data = await res.json();
            setUser(data.user?? null)

            setErrors({})

            if(data.user) {
                setFormValues(initialValues)
            }
        } catch(err: any) {
            console.error("Erro de Rede:", err)
        }
    }

    return (
        <div id={styles["login-form"]} className={styles["login-register-container"]}>
            <div className={styles["container-title"]}>
                <h2>LOGAR</h2>
            </div>
            <div className={styles["form-container"]}>
                <form id="login-form" onSubmit={handleLogin}>
                    <div className={styles["form-group"]}>
                        <input type="email" name="email" value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})} placeholder="Email"></input>
                        {errors.email && <p className={`${styles["error-message"]} red`}>{errors.email}</p>}
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="password" name="user_key" value={formValues.user_key} onChange={e => setFormValues({...formValues, user_key: e.target.value})} placeholder="Senha"></input>
                        {errors.user_key && <p className={`${styles["error-message"]} red`}>{errors.user_key}</p>}
                    </div>
                </form>
                <div className={styles["error-message-container"]}>
                    {errors.login && (
                        <p className={`${styles["error-message"]} red`}>{errors.login}</p>
                    )}  
                </div>
                <Button type="primary" className={styles["submit-btn"]} htmlType="submit" form="login-form">Entrar</Button>
            </div>
        </div>
    )
}

export default LoginForm;