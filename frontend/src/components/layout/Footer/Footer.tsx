import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer id={styles["main-footer"]}>
            <div className={styles["footer-bg"]}></div>
        </footer>
    )
}

export default Footer;