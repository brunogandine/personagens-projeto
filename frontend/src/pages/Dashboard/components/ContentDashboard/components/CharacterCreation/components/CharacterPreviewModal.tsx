import styles from "@/pages/Dashboard/Dashboard.module.css";
import { Modal } from "antd";
import type { CharacterPreview } from "../../../types/content.types";
import { BASE_ATTRIBUTES_URL } from "../CharacterCreation";

type CharacterPreviewModalProps = {
    open: boolean
    onClose: () => void
    preview: CharacterPreview | null
}

const CharacterPreviewModal = ({open, onClose, preview}:  CharacterPreviewModalProps) => {
    if(!preview)
        return null;

    return (
        <Modal
            className={`modal-default`}
            title="Resumo do Personagem"
            width={800}
            open={open}
            onCancel={onClose}
            footer
        >
            <div className={`${styles["preview-character-modal-content"]}`}>
                <div className={`${styles["preview-character-left"]}`}>
                    <div className={`${styles["small-artwork-preview"]}`}>
                        <img src={preview.smallArtworkPreview} />
                    </div>
                    <div className={`${styles["name-preview"]}`}>
                        <span>{preview.name}</span>
                    </div>
                </div>
                <div className={`${styles["preview-character-right"]}`}>
                    <div className={`${styles["stats-preview"]}`}>
                        <div className={`${styles["stat-item"]}`} data-stat={`hp`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_life.png`} />
                            </div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{preview.stats.hp}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["stat-item"]}`} data-stat={`atk`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_atk.png`} />
                            </div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{preview.stats.atk}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["stat-item"]}`} data-stat={`def`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_def.png`} />
                            </div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{preview.stats.def}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["details-preview"]}`}>
                        <div className={`anime-preview`}>
                            <span>Anime: <span>{preview.anime.name}</span></span>
                        </div>
                        <div className={`active-preview`}>
                            <span>Personagem Ativo: <span>{preview.active ? "Sim" : "Não"}</span></span>
                        </div>
                        <div className={`lock-preview`}>
                            <span>Personagem Bloqueado: <span>{preview.lock ? "Sim" : "Não"}</span></span>
                        </div>
                        <div className={`${styles["description-preview"]}`}>
                            <span>Descrição do Personagem:</span>
                            <br/>
                            <span>{preview.description ? preview.description : "Sem descrição."}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default CharacterPreviewModal;