import { NavLink } from "react-router-dom";
import styles from "../../Dashboard.module.css";
import { PlusOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

const BASE_CHARACTER_DASHBOARD_URL = "/dashboard/characters";

const CharacterOptions = () => {
    return (
        <div className={`${styles["characters-options"]}`}>
            <NavLink to={`${BASE_CHARACTER_DASHBOARD_URL}/creation`}>
                <div className={`${styles["character-option-item"]}`}>
                    <PlusOutlined style={{ fontSize: 36, lineHeight: '140px' }} />
                    <span style={{ fontSize: 14, fontWeight: "bold"}}>Novo Personagem</span>
                </div>
            </NavLink>
            <NavLink to={`${BASE_CHARACTER_DASHBOARD_URL}/edit`}>
                <div className={`${styles["character-option-item"]}`}>
                    <EditFilled style={{ fontSize: 36, lineHeight: '140px' }} />
                    <span style={{ fontSize: 14, fontWeight: "bold"}}>Editar Personagem</span>
                </div>
            </NavLink>
            <div className={`${styles["character-option-item"]}`}>
                <DeleteFilled style={{ fontSize: 36, lineHeight: '140px' }} />
                <span style={{ fontSize: 14, fontWeight: "bold"}}>Deletar Personagem</span>
            </div>
        </div>
    );
};

export default CharacterOptions;