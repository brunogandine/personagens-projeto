import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import { Input, Modal, Select, Tooltip } from "antd";
import { BASE_ATTRIBUTES_URL } from "@/pages/Dashboard/components/ContentDashboard/components/ContentMain/ContentMain"
import { EditFilled } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import type { CharacterEdit } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";
import { useMessageModal } from "@/contexts/UIFeedbackContext";

type CharacterEditModalProps = {
    open: boolean
    onClose: () => void
    character: CharacterEdit | null
    animesList: {
        value: number,
        label: string
    }[]
    toggleBoolean: (setState: React.Dispatch<React.SetStateAction<boolean>>) => void;
}


const CharacterEditModal = ({open, onClose, character, animesList, toggleBoolean}:  CharacterEditModalProps) => {
    const { showToast } = useMessageModal();

    if(!character)
        return null;

    const [editedName, setEditedName] = useState<string | null>(null);
    const [draftName, setDraftName] = useState(character.name);
    const [selectedAnimeId, setSelectedAnimeId] = useState(character.anime.id);
    const [isActive, setIsActive] = useState(character.active);
    const [isLock, setIsLock] = useState(character.lock);

    const [isEditing, setIsEditing] = useState(false);

    const editNameRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSelectedAnimeId(character.anime.id);
        setIsActive(character.active);
    }, [character]);

    useEffect(() => {
        if(!isEditing)
            return;

        const handleOutsideClick = (event: PointerEvent) => {
            if(editNameRef.current && !editNameRef.current.contains(event.target as Node)) {
                handleCancelEdit();
            };
        };

        document.addEventListener("pointerdown", handleOutsideClick);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
    }, [isEditing])

    const handleConfirmEditName = () => {
        const name = draftName.trim();

        if(!name)
            return;

        if(name === character.name) {
            if(editedName !== null) {
                setEditedName(null);
                setIsEditing(false);
                return;
            } else {
                showToast({text: "Coloque um nome diferente do nome original.", type: "error"});
                return;
            };
        };

        if(name === editedName) {
            showToast({text: "O nome que você editou anteriormente é igual ao que você está tentando confirmar.", type: "error"});
            return;
        };

        setEditedName(name);
        setIsEditing(false);
        return;
    };

    const handleCancelEdit = () => {
        setDraftName(editedName !== null ? editedName : character.name);
        setIsEditing(false);
    };

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
                                {isEditing
                                ? (
                                    <div ref={editNameRef}>
                                        <Input className={`field-default ${styles["edit-input"]}`} value={draftName} onChange={(e) => setDraftName(e.target.value)}/>
                                        <Tooltip
                                            title={"Confirmar Edição"}
                                            destroyOnHidden={true}
                                        >
                                            <span className={`${styles["edit-actions"]}`} style={{color: "#00ff40"}} onClick={() => handleConfirmEditName()}>✓</span>
                                        </Tooltip>
                                        <Tooltip
                                            title={"Cancelar Edição"}
                                            destroyOnHidden={true}
                                        >
                                            <span className={`${styles["edit-actions"]}`} style={{color: "#ff5656"}} onClick={() => handleCancelEdit()}>✕</span>
                                        </Tooltip>
                                    </div>
                                )
                                : (editedName !== null
                                    ? (
                                        <>
                                            <span>{editedName}</span>
                                            <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditing(true)}/>
                                        </>
                                    ) 
                                    : (
                                        <>
                                            <span>{character.name}</span>
                                            <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditing(true)}/>
                                        </>
                                    )
                                )}
                            </dd>
                        </div>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Anime:</dt>
                            <dd>
                                <Select 
                                    className={`field-default select-default ${styles["edit-input"]}`}
                                    classNames={{popup: { root: "select-default-popup"} }} 
                                    value={selectedAnimeId}
                                    options={animesList}
                                    onChange={(value) => setSelectedAnimeId(value)}
                                />
                            </dd>
                        </div>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Ativo:</dt>
                            <dd>
                                <CheckboxComponent checked={isActive} onToggle={() => toggleBoolean(setIsActive)}/>
                            </dd>
                        </div>
                        <div className={`${styles["basic-item"]}`}>
                            <dt>Bloqueado:</dt>
                            <dd>
                                <CheckboxComponent checked={isLock} onToggle={() => toggleBoolean(setIsLock)}/>
                            </dd>
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