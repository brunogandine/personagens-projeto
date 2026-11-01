import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { Modal } from "antd";

type Props = {
    open: boolean;
    onClose: () =>  void;
};

const UserCharacterConfigModal = ({open, onClose}: Props) => {
    return (
        <Modal title={`Detalhes do Personagem`} wrapClassName={`modal-default`} open={open} onCancel={onClose} width={`fit-content`} footer >
            <div className={`${styles["character-details-content"]}`}>
                <div className={`${styles["details-artwork"]}`}>
                    <div className={`${styles["artwork"]}`}>
                        <img src={`/assets/images/cards/1/artwork/1/1.png`}></img>
                    </div>
                </div>
                <div className={`${styles["details-general"]}`}>
                    <div className={`${styles["general-info"]}`}>
                        <div className={`${styles["name"]}`}>
                            <span>Naruto Uzumaki</span>
                        </div>
                        <div className={`${styles["level"]}`}>
                            <span >Level 1</span>
                            <span style={{justifySelf: "end"}} >0/500 &#40;0%&#41;</span>
                            <div className={`${styles["exp-bar"]}`}>
                                <div className={`${styles["fill-bar"]}`} style={{width: `50%`}}></div>
                            </div>
                        </div>
                        <div className={`${styles["info-container"]}`}>
                            <div className={`${styles["general"]}`}>
                                <div className={`${styles["title"]}`}>
                                    <span style={{fontSize: "16px", fontWeight: "bold"}} >Informações Gerais</span>
                                </div>
                                <div className={`${styles["info"]}`}>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="rarity">Raridade</label>
                                        <span id="rarity">Comum</span>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="acquired">Adquirido em</label>
                                        <span id="acquired">01/01/2027</span>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="guild">Guilda</label>
                                        <span id="guild">Sparking!</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["battle-statistics"]}`}>
                                <div className={`${styles["title"]}`}>
                                    <span style={{fontSize: "16px", fontWeight: "bold"}}>Estatísticas de Batalha</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UserCharacterConfigModal;