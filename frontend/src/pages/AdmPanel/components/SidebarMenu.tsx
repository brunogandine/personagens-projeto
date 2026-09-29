import styles from "../AdmPanel.module.css";

const SidebarMenu = () => {
    return (
        <>
            <aside id={`${styles["adm-navbar"]}`}>
                <ul>
                    <li className={`${styles["menu-item"]}`}>Dashboard</li>
                    <li>teste2</li>
                </ul>
            </aside>
        </>
    )
}

export default SidebarMenu;