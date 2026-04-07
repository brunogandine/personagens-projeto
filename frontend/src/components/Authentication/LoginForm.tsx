import styles from "../ui/forms/Form.module.css"
import { useState } from "react";
import { Button } from "antd";
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormValues {
    email: string;
    user_key: string;
}

const initialValues: LoginFormValues = {
    email: "",
    user_key: ""
}

function LoginForm() {
    const { login } = useAuth();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formValues, setFormValues] = useState<LoginFormValues>(initialValues)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            email: formValues.email,
            user_key: formValues.user_key
        }

        setErrors({});

        const result = await login(payload);

        if(!result.success) {
            setFormValues(prev => ({...prev, user_key: ""}));

            if(result.errors) {
                setErrors(result.errors);
            }

            if(result.message) {
                console.error(result.message);
            }

            return;
        }

        setErrors({});
        setFormValues(initialValues);

        return;
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