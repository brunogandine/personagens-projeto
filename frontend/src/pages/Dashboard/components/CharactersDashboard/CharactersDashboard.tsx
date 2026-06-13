import { useAuth } from "@/contexts/AuthContext";
import styles from "../../Dashboard.module.css";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

const CharactersDashboard = () => {
    const { user } = useAuth();

    if(!user)
        return null;

    return (
        <>
            <div className={`${styles["characters-content"]}`}>
                <div className={`${styles["character-list"]}`}>
                    <span className={`container-title`}>Lista de Personagens</span>
                    <div className={`${styles["character-list-search-filters"]}`}>
                        <input className={`field-default ${styles["character-list-search-input"]}`} type="text" placeholder="Pesquisar personagem" />
                        <div className={`${styles["character-list-filters"]}`}>
                            <span className={`item-default item-select`}>Filtrar</span>
                        </div>
                    </div>
                    <div className={`container-default ${styles["character-list-content"]}`}>
                        <div className={`${styles["character-list-container"]}`}>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                            <div className={`${styles["character-list-item"]}`}>
                                <img src={`/assets/images/cards/1/small/1/1.jpg`} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["characters-options"]}`}>
                        <div className={`${styles["character-option-item"]}`}>
                            <PlusOutlined style={{ fontSize: 36, lineHeight: '140px' }} />
                            <span style={{ fontSize: 14, fontWeight: "bold"}}>Novo Personagem</span>
                        </div>
                        <div className={`${styles["character-option-item"]}`}>
                            <DeleteFilled style={{ fontSize: 36, lineHeight: '140px' }} />
                            <span style={{ fontSize: 14, fontWeight: "bold"}}>Excluir Personagem</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharactersDashboard;

