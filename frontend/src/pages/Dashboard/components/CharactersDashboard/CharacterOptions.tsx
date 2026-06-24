import { NavLink } from "react-router-dom";
import styles from "../../Dashboard.module.css";
import { PlusOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

type Props = {
    type: "animes" | "characters"
}

const ContentOptions = ({type}: Props) => {
    const BASE_DASHBOARD_URL = `/dashboard/${type}`;

    return (
        <div className={`${styles["content-options"]}`}>
            <NavLink to={`${BASE_DASHBOARD_URL}/creation`}>
                <div className={`${styles["content-option-item"]}`}>
                    <PlusOutlined style={{ fontSize: 30, lineHeight: '50px' }} />
                </div>
            </NavLink>
            <NavLink to={`${BASE_DASHBOARD_URL}/edit`}>
                <div className={`${styles["content-option-item"]}`}>
                    <EditFilled style={{ fontSize: 30, lineHeight: '50px' }} />
                </div>
            </NavLink>
            <div className={`${styles["content-option-item"]}`}>
                <DeleteFilled style={{ fontSize: 36, lineHeight: '50px' }} />
            </div>
        </div>
    );
};

export default ContentOptions;