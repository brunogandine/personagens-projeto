import { useState } from "react";
import { maskEmail } from "../../utils/maskEmail";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "../../pages/Profile/Profile.module.css"

type Props = {
    email?: string;
}

const EmailField = ({email}: Props) => {
    const [visible, setVisible] = useState(false);

    if(!email) return null

    return (
        <>
            <div className={`${styles["p-email-value"]} gold`}>
                <p>{visible ? email : maskEmail(email)}</p>
            </div>
            <button className={styles["p-showBtn"]}
                style={{background: "transparent", border: "none"}}
                onClick={() => setVisible(v => !v)}
                aria-label="Mostrar email"
            >
                <span className="showText">{visible ? "Esconder" : "Mostrar"}</span>
                {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
        </>
    )
}

export default EmailField