import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Header.module.css'

function HeaderPublic() {
    return (
        <header id="nav-header" className={`${styles["nav-header"]}`}>
            <div id="nav-container" className={`${styles["nav-container"]}`}>
                <div className={`${styles["no-auth-container"]}`}>
                    <Avatar className={styles["user-pic"]} icon={<UserOutlined />}/>
                    <div className={styles["user-name"]}>
                            <p>Entre ou Cadastre-se</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderPublic;