import styles from "../ui/forms/Form.module.css"
import { Button } from "antd";

function LoginForm() {
    return (
        <div id={styles["login-form"]} className={styles["login-register-container"]}>
            <div className={styles["container-title"]}>
                <h2>LOGAR</h2>
            </div>
            <div className={styles["form-container"]}>
                <form method="post">
                    <div className={styles["form-group"]}>
                        <input type="email" placeholder="Email"></input>
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="password" placeholder="Senha"></input>
                    </div>
                </form>
                <Button type="primary" className={styles["submit-btn"]} htmlType="submit">Entrar</Button>
            </div>
        </div>
    )
}

export default LoginForm;