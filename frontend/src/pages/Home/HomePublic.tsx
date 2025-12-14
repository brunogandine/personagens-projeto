import styles from "./Home.module.css"
import LoginForm from "../../components/Authentication/LoginForm";
import RegisterForm from "../../components/Authentication/RegisterForm";
import VerticalRuler from "../../components/Utils/VerticalRuler";

const HomePublic = () => {
    return (
        <div id={styles["home-content"]}>
            <div className={styles["project-title"]}>
                <h1>PROJETO [LISTA DE PERSONAGENS E CRIAÇÃO]</h1>
            </div>
            <div id={styles["auth-signup-container"]}>
                <LoginForm/>
                <VerticalRuler />
                <RegisterForm/>
            </div>
        </div>
    )
}

export default HomePublic;