import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Header.module.css'

function HeaderPublic() {
    return (
        <header id={styles["header-nav"]}>
            <div id={styles["header-container"]}>
                <div id={styles["main-header"]}>
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