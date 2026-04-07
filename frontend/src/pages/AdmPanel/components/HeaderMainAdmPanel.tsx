import styles from "../AdmPanel.module.css"

const HeaderMainAdmPanel = () => {
    return (
        <div className={`${styles["header-adm"]}`} >
            <span className={`${styles["header-title"]}`}>Dashboard</span>
        </div>
    )
}

export default HeaderMainAdmPanel;