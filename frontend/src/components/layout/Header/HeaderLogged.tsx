import { LogoutOutlined } from '@ant-design/icons';
import type { AuthUser } from '../../../types/AuthUser';
import VerticalRuler from '../../Utils/VerticalRuler';
import styles from './Header.module.css'

type HeaderProps = {
    user: AuthUser
    loading: boolean
}

function HeaderLogged({user, loading}: HeaderProps) {
    const handleLogout = async () => {
        const res = await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            window.location.href = "/";
        }
    }

    return (
        <header id={styles["header-nav"]}>
            <div id={styles["header-container"]}>
                <div id={styles["main-header"]}>
                    <div className={styles["user-pic"]}></div>
                    <div className={styles["user-name"]}>
                        {loading ? (<p>Carregando...</p>) : (<p>{user.username}</p>)}
                    </div>
                </div>
                {user && (
                    <>
                        <VerticalRuler color="#FFFFFF"/>                
                        <div id={styles["user-header"]}>
                            <div className={styles["level"]}>
                                <p>LEVEL <span className={
                                    user.level <= 10 ? "" 
                                    : user.level <= 20 ? "green" 
                                    : user.level <= 40 ? "gold" 
                                    : "orange"
                                    }>
                                        {user.level}
                                </span>
                                </p>
                            </div>
                            <div className={styles["currency"]}>
                                <div className="currency-icon">
                                    <img src={"/assets/images/icons/currency.png"}></img>
                                </div>
                                <div className={`${styles["currency-value"]} gold`}>{user.currency}</div>
                            </div>
                        </div>
                    </>
                )}
                <div className={styles["link-section"]}>

                </div>
                <div className={styles["logout-section"]} onClick={handleLogout}>
                    <LogoutOutlined style={{fontSize: "28px"}}/>
                    <p>Logout</p>
                </div>
            </div>
        </header>
    )
}

export default HeaderLogged;