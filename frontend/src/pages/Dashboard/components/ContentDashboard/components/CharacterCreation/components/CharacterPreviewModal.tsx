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
            width={"fit-content"}
            open={open}
            onCancel={onClose}
            footer
        >
            <div className={`${styles["preview-character-modal-content"]}`}>
                <div className={`${styles["small-artwork-preview"]}`}>
                    <img src={preview.smallArtworkPreview} />
                </div>
                <div className={`${styles["preview-character-details"]}`}>
                    <div className={`preview-basic-details`}>
                        <dl>
                            <div className={`${styles["basic-item"]}`}>
                                <dt>Personagem:</dt>
                                <dd>{preview.name}</dd>
                            </div>
                            <div className={`${styles["basic-item"]}`}>
                                <dt>Anime:</dt>
                                <dd>{preview.anime.name}</dd>
                            </div>
                            <div className={`${styles["basic-item"]}`}>
                                <dt>Ativo:</dt>
                                <dd>{preview.active ? "Sim" : "Não"}</dd>
                            </div>
                            <div className={`${styles["basic-item"]}`}>
                                <dt>Bloqueado:</dt>
                                <dd>{preview.lock ? "Sim" : "Não"}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className={`${styles["preview-character-attributes"]}`}>
                        <div className={`${styles["preview-section"]}`}>Atributos Base:</div>
                        <div className={`${styles["stat-item"]}`} data-stat={`life`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_life.png`} />
                            </div>
                            <span className={`${styles["stat-spacing"]}`}>//</span>
                            <div className={`${styles["stat-name"]}`}>Vida</div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{preview.stats.hp}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["stat-item"]}`} data-stat={`atk`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_atk.png`} />
                            </div>
                            <span className={`${styles["stat-spacing"]}`}>//</span>
                            <div className={`${styles["stat-name"]}`}>Ataque</div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{preview.stats.atk}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["stat-item"]}`} data-stat={`def`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_def.png`} />
                            </div>
                            <span className={`${styles["stat-spacing"]}`}>//</span>
                            <div className={`${styles["stat-name"]}`}>Defesa</div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{preview.stats.def}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["preview-character-description"]}`}>
                        {preview.description ? preview.description : "Sem descrição."}
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default CharacterPreviewModal;