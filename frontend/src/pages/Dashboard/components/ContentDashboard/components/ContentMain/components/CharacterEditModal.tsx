import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import { Input, Modal } from "antd";
import { BASE_ATTRIBUTES_URL } from "@/pages/Dashboard/components/ContentDashboard/components/ContentMain/ContentMain"
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import type { CharacterEdit } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";

type CharacterEditModalProps = {
    open: boolean
    onClose: () => void
    character: CharacterEdit | null
}

type EditingFields = 
    | "anime"
    | "name"


const CharacterEditModal = ({open, onClose, character}:  CharacterEditModalProps) => {
    const [editedName, setEditedName] = useState<string | null>(null);
    const [draftName, setDraftName] = useState("");

    const [isEditing, setIsEditing] = useState<EditingFields | null>(null);

    if(!character)
        return null;

    return (
        <Modal
            wrapClassName={`modal-default`}
            title="Editar Personagem"
            width={"600px"}
            open={open}
            onCancel={onClose}
            footer
        >
            <div className={`${styles["edit-character-modal-content"]}`}>
                <div className={`${styles["artwork-edit"]}`}>
                    <div style={{backgroundImage: `url(/assets/images/cards/background/artwork/normal.png)`}} className={`${styles["artwork-container"]}`}>
                        {character.artwork ? (<img src={character.artwork} />) : <p className={`${styles["inner-text-artwork"]}`}>?</p>}
                    </div>
                    <div style={{backgroundImage: `url(/assets/images/cards/background/thumbnail/normal.png)`}} className={`${styles["thumbnail-container"]}`}>
                        {character.thumbnail ? (<img src={character.thumbnail} />) : <p className={`${styles["inner-text-artwork"]}`}>?</p>}
                    </div>
                </div>
                <div className={`${styles["basic-details"]}`}>
                    <dl>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Personagem:</dt>
                            <dd>
                                {isEditing === "name"
                                ? (
                                    <>
                                        <Input className={"field-default"} value={draftName} onChange={(e) => setDraftName(e.target.value)}/>
                                        <span style={{fontSize: "20px", fontWeight: "bold", color: "#00ff40", cursor: "pointer"}} onClick={() => setIsEditing(null)}>✓</span>
                                        <span style={{fontSize: "20px", fontWeight: "bold", color: "#ff5656", cursor: "pointer"}} onClick={() => setIsEditing(null)}>✕</span>
                                    </>
                                )
                                : (editedName !== null
                                    ? (
                                        <>
                                            <span>editedName</span>
                                            <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditing("name")}/>
                                        </>
                                    ) 
                                    : (
                                        <>
                                            <span>{character.name}</span>
                                            <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditing("name")}/>
                                        </>
                                    )
                                )}
                            </dd>
                        </div>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Anime:</dt>
                            <dd>{character.anime.name}</dd>
                        </div>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Ativo:</dt>
                            <dd>{character.active ? "Sim" : "Não"}</dd>
                        </div>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Bloqueado:</dt>
                            <dd>{character.lock ? "Sim" : "Não"}</dd>
                        </div>
                    </dl>
                    <div className={`${styles["details-section-title"]}`}>
                        <span>Atributos Base:</span>
                    </div>
                    <div className={`${styles["basic-stats"]}`}>
                        <div className={`${styles["stat-item"]}`} data-stat={`life`}>
                            <div className={`stat-icon`}>
                                <img src={`${BASE_ATTRIBUTES_URL}/for_life.png`} />
                            </div>
                            <span className={`${styles["stat-spacing"]}`}>//</span>
                            <div className={`${styles["stat-name"]}`}>Vida</div>
                            <div className={`${styles["stat-bar"]}`}>
                                <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                <div className={`${styles["stat-value"]}`}>
                                    <span>{character.stats.hp}</span>
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
                                    <span>{character.stats.atk}</span>
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
                                    <span>{character.stats.def}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["details-section-title"]}`}>Descrição do Personagem:</div>
                    <div className={`${styles["description-container"]}`}>
                        <div className={`${styles["description-textbox"]}`}>
                            {character.description ? character.description : "Sem descrição."}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default CharacterEditModal;