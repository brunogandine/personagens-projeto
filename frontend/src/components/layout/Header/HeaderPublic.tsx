import styles from './Header.module.css'

function HeaderPublic() {
    return (
        <header id={styles["header-nav"]}>
            <div id={styles["header-container"]}>
                <div id={styles["main-header"]}>
                    <div className={styles["user-pic"]}></div>
                    <div className={styles["user-name"]}>
                            <p>Entre ou Cadastre-se</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderPublic;