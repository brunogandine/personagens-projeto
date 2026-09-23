import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import ImageCropModal from "@/pages/Dashboard/shared/ImageCropModal";
import { Button, Input, InputNumber, Modal, Select, Tooltip } from "antd";
import { BASE_ATTRIBUTES_URL } from "@/pages/Dashboard/components/ContentDashboard/components/ContentMain/ContentMain"
import { EditFilled, UndoOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { validateImageFile } from "@/helpers/validateImageFile";
import { Request } from "@/services/apiClient";
import type { CharacterEdit } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const BASE_CARDS_PATH = "/assets/images/cards/"

type CharacterEditModalProps = {
    open: boolean
    onClose: () => void
    character: CharacterEdit
    animesList: {
        value: number,
        label: string
    }[]
    toggleBoolean: (setState: React.Dispatch<React.SetStateAction<boolean>>) => void;
    imageCacheVersion: number | null;
    onChangeImage: (characterId: number) => void;
    onSuccess: () => void;
};

type CropAspectOptions = {
    width: number;
    height: number;
}

type CropTarget = {
    target: "artwork" | "thumbnail";
    image: string;
    options: CropAspectOptions;
}

const CharacterEditModal = ({open, onClose, character, animesList, toggleBoolean, imageCacheVersion, onChangeImage, onSuccess }:  CharacterEditModalProps) => {
    const { showToast, showMessageModal } = useMessageModal();

    const [cropTarget, setCropTarget] = useState<CropTarget | null>(null);

    const [artworkLoadError, setArtworkLoadError] = useState(false);
    const [thumbnailLoadError, setThumbnailLoadError] = useState(false);

    const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
    const [artworkBlob, setArtworkBlob] = useState<Blob | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);

    const [pendingRemoveArtwork, setPendingRemoveArtwork] = useState(false);
    const [pendingRemoveThumbnail, setPendingRemoveThumbnail] = useState(false);

    const [draftName, setDraftName] = useState(character.name);
    const [editedName, setEditedName] = useState<string | null>(null);
    const [selectedAnimeId, setSelectedAnimeId] = useState(character.anime.id);
    const [isActive, setIsActive] = useState(character.active);
    const [isLock, setIsLock] = useState(character.lock);
    const [editedHP, setEditedHP] = useState<number | null>(null);
    const [editedATK, setEditedATK] = useState<number | null>(null);
    const [editedDEF, setEditedDEF] = useState<number | null>(null);
    const [editedDescription, setEditedDescription] = useState<string | null>(null);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const editNameRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const fileInputRefArtwork = useRef<HTMLInputElement | null>(null);
    const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setDraftName(character.name);
        setSelectedAnimeId(character.anime.id);
        setIsActive(character.active);
        setIsLock(character.lock);
        
    }, [character]);

    useEffect(() => {
        if(!isEditingName)
            return;

        const handleOutsideClick = (event: PointerEvent) => {
            if(editNameRef.current && !editNameRef.current.contains(event.target as Node)) {
                handleCancelEditName();
            };
        };

        document.addEventListener("pointerdown", handleOutsideClick);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
    }, [isEditingName]);

    const imageCacheQuery = imageCacheVersion !== null ? `?v=${imageCacheVersion}` : "";

    const artworkUrl = `${BASE_CARDS_PATH}${character.id}/artwork/1/1.png${imageCacheQuery}`
    const thumbnailUrl = `${BASE_CARDS_PATH}${character.id}/thumbnail/1/1.png${imageCacheQuery}`;

    const isCropOpen = cropTarget !== null;

    const uploadArtwork = () => {
        fileInputRefArtwork.current?.click();
    };

    const uploadThumbnail = () => {
        fileInputRefThumbnail.current?.click();
    };

    const handleArtwork = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file)
            return;

        if(!ALLOWED_TYPES.includes(file.type)) {
            return;
        }

        if(file.size > MAX_FILE_SIZE)
            return;

        const isValidImg = validateImageFile(file);

        if(!isValidImg)
            return;

        const imageUrl = URL.createObjectURL(file);

        setCropTarget({
            target: "artwork",
            image: imageUrl,
            options: {
                width: 275,
                height: 325
            }
        });

        e.target.value = "";
    };

    const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file)
            return;

        if(!ALLOWED_TYPES.includes(file.type))
            return;

        if(file.size > MAX_FILE_SIZE)
            return;

        const isValidImg = validateImageFile(file);

        if(!isValidImg)
            return;

        const imageUrl = URL.createObjectURL(file);

        setCropTarget({
            target: "thumbnail",
            image: imageUrl,
            options: {
                width: 160,
                height: 145
            }
        });

        e.target.value = "";
    };

    const handleCropClose = () => {
        cropTarget?.image && URL.revokeObjectURL(cropTarget.image);

        setCropTarget(null);
    };

    const handleCropApply = (blob: Blob) => {
        if(!cropTarget)
            return;

        if(cropTarget.target === "artwork") {
            if(artworkPreview)
                URL.revokeObjectURL(artworkPreview);

            setArtworkPreview(URL.createObjectURL(blob));
            setArtworkBlob(blob);
            setPendingRemoveArtwork(false);
        };

        if(cropTarget.target === "thumbnail") {
            if(thumbnailPreview)
                URL.revokeObjectURL(thumbnailPreview);

            setThumbnailPreview(URL.createObjectURL(blob));
            setThumbnailBlob(blob);
            setPendingRemoveThumbnail(false);
        };

        URL.revokeObjectURL(cropTarget.image);

        setCropTarget(null);
    };

    const handleRemoveArtwork = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        if(artworkLoadError)
            return;

        if(pendingRemoveArtwork)
            return setPendingRemoveArtwork(false)

        if(artworkPreview) {
            URL.revokeObjectURL(artworkPreview);

            setArtworkPreview(null);
            setArtworkBlob(null);

            return;
        };

        setPendingRemoveArtwork(true);
    };

    const handleRemoveThumbnail = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        if(thumbnailLoadError)
            return;

        if(pendingRemoveThumbnail)
            return setPendingRemoveThumbnail(false);

        if(thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);

            setThumbnailPreview(null);
            setThumbnailBlob(null);

            return;
        };

        setPendingRemoveThumbnail(true); 
    };

    const handleConfirmEditName = () => {
        const name = draftName.trim();

        if(!name)
            return;

        if(name === character.name) {
            if(editedName !== null) {
                setEditedName(null);
                setIsEditingName(false);
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
        setIsEditingName(false);

        return;
    };

    const handleCancelEditName = () => {
        setDraftName(editedName !== null ? editedName : character.name);
        setIsEditingName(false);
    };

    const currentDescription = 
        editedDescription !== null
            ? editedDescription
            : character.description ?? ""

    const displayedDescription = currentDescription.trim() || "Sem descrição";
 
    const handleStartEditingDescription = () => {
        if(isEditingDescription)
            return;

        setIsEditingDescription(true);

        if(descriptionRef.current)
            descriptionRef.current.innerText =
                editedDescription !== null
                    ? editedDescription
                    : character.description ?? "";
    };

    const handleConfirmEditDescription = () => {
        const description = descriptionRef.current?.innerText.trim() ?? "";

        setEditedDescription(description);
        setIsEditingDescription(false);
    };

    const handleCancelEditDescription = () => {
        setIsEditingDescription(false);
    };

    const handleResetDescription = () => {
        if(editedDescription === null)
            return;

        setEditedDescription(null);
        setIsEditingDescription(false);

        if(descriptionRef.current) 
            descriptionRef.current.innerText = 
                character.description ?? "";
    };

    const resetStates = () => {
        if(artworkPreview) {
            URL.revokeObjectURL(artworkPreview);

            setArtworkPreview(null);
            setArtworkBlob(null);
        };

        if(thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);

            setThumbnailPreview(null);
            setThumbnailBlob(null);
        };

        if(pendingRemoveArtwork)
            setPendingRemoveArtwork(false);

        if(pendingRemoveThumbnail)
            setPendingRemoveThumbnail(false);

        setArtworkLoadError(false);
        setThumbnailLoadError(false);

        setEditedName(null);

        setSelectedAnimeId(character.anime.id);

        setIsActive(character.active);
        setIsLock(character.lock);

        setEditedHP(null);
        setEditedATK(null);
        setEditedDEF(null);
        setEditedDescription(null);

        setIsEditingName(false);
        setIsEditingDescription(false);
    };

    const handleClose = () => {
        resetStates();
        onClose();
    };

    const buildEditPayload = () => {
        const formData = new FormData();

        if(artworkBlob !== null) {
            formData.append("artwork", artworkBlob);
        } else if(pendingRemoveArtwork)
            formData.append("remove_artwork", String(pendingRemoveArtwork));

        if(thumbnailBlob !== null) {
            formData.append("thumbnail", thumbnailBlob)
        } else if(pendingRemoveThumbnail)
            formData.append("remove_thumbnail", String(pendingRemoveThumbnail));

        if(editedName !== null)
            formData.append("name", editedName);

        if(selectedAnimeId !== character.anime.id)
            formData.append("anime_id", String(selectedAnimeId));

        if(isActive !== character.active)
            formData.append("active", String(isActive));

        if(isLock !== character.lock)
            formData.append("currency_lock", String(isLock));

        if(editedHP !== null && editedHP !== character.stats.hp)
            formData.append("attr_hp", String(editedHP));

        if(editedATK !== null && editedATK !== character.stats.atk)
            formData.append("attr_atk", String(editedATK));

        if(editedDEF !== null && editedDEF !== character.stats.def)
            formData.append("attr_def", String(editedDEF));

        if(editedDescription !== null)
            formData.append("description", editedDescription);

        if([...formData.entries()].length === 0)
            return null;

        return formData;
    };

    const handleConfirmEditModal = async () => {
        if(isEditingDescription)
            return showToast({
                type: "warning",
                text: "Há uma edição em andamento na descrição de personagem. Confirme ou Cancele antes de aplicar alterações no personagem."
            });

        const payload = buildEditPayload();

        if(payload === null) {
            showToast({
                type: "error",
                text: "Nenhuma alteração foi feita no personagem."
            });

            return;
        };

        const imageChanged = 
            artworkBlob !== null ||
            thumbnailBlob !== null ||
            pendingRemoveArtwork ||
            pendingRemoveThumbnail

        const res = await Request.patch(`/characters/${character.id}`, payload);

        if(!res.ok) {
            if(res.status === 404) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    }
                });

                return;
            };

            if(res.status === 500) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message,
                        instructions: "Tente novamente."
                    }
                });

                return;
            };
        };

        if(res.data.errors) {
            if(res.data.type === "storage") {
                showMessageModal({
                    data: {
                        type: "warning",
                        description: "O personagem foi atualizado com sucesso, mas ocorreram erros ao salvar uma ou mais imagens:",
                        list: res.data.errors,
                        instructions: "Tente novamente."
                    }
                });

                resetStates();
                onClose();

                return;
            };
        };

        if(imageChanged)
            onChangeImage(character.id);

        showToast({type: "success", text: res.data.message, });

        resetStates();
        onSuccess();
        onClose();
    };

    return (
        <>
            <Modal
                wrapClassName={`modal-default`}
                title="Editar Personagem"
                width={"600px"}
                open={open && !isCropOpen}
                onCancel={handleClose}
                footer
            >
                <div className={`${styles["edit-character-modal-content"]}`}>
                    <div className={`${styles["artwork-edit"]}`}>
                        <div style={{backgroundImage: `url(/assets/images/cards/background/artwork/normal.png)`, cursor: "pointer"}} className={`${styles["artwork-container"]}`} onClick={uploadArtwork} onContextMenu={handleRemoveArtwork} >
                            {artworkPreview ? (<img src={artworkPreview} />) 
                            : artworkLoadError ? (<p className={`${styles["inner-text-artwork"]}`}>?</p>)
                                : pendingRemoveArtwork ? (<p className={`${styles["inner-text-artwork"]}`}>?</p>)
                                    : (<img src={artworkUrl} onError={() =>  setArtworkLoadError(true)} />)
                            }
                            <input ref={fileInputRefArtwork} type="file" accept="image/jpeg,image/png" style={{display: "none"}} onChange={handleArtwork} />
                        </div>
                        <div style={{backgroundImage: `url(${BASE_CARDS_PATH}background/thumbnail/normal.png)`, cursor: "pointer"}} className={`${styles["thumbnail-container"]}`} onClick={uploadThumbnail} onContextMenu={handleRemoveThumbnail} >
                            {thumbnailPreview ? (<img src={thumbnailPreview} />) 
                                : thumbnailLoadError ? (<p className={`${styles["inner-text-artwork"]}`}>?</p>)
                                    : pendingRemoveThumbnail ? (<p className={`${styles["inner-text-artwork"]}`}>?</p>)
                                        : (<img src={thumbnailUrl} onError={() =>  setThumbnailLoadError(true)} />)
                            }
                            <input ref={fileInputRefThumbnail} type="file" accept="image/jpeg,image/png" style={{display: "none"}} onChange={handleThumbnail} />
                        </div>
                    </div>
                    <div className={`${styles["basic-details"]}`}>
                        <dl>
                            <div className={`${styles["basic-item"]}`}>
                                <dt>Personagem:</dt>
                                <dd>
                                    {isEditingName
                                    ? (
                                        <div ref={editNameRef}>
                                            <Input className={`field-default ${styles["edit-input"]}`} value={draftName} onChange={(e) => setDraftName(e.target.value)} onPressEnter={handleConfirmEditName} />
                                            <span className={`${styles["edit-actions"]}`} style={{color: "#00ff40"}} onClick={handleConfirmEditName}>✓</span>
                                            <span className={`${styles["edit-actions"]}`} style={{color: "#ff5656"}} onClick={handleCancelEditName}>✕</span>
                                        </div>
                                    )
                                    : (editedName !== null
                                        ? (
                                            <>
                                                <span>{editedName}</span>
                                                <Tooltip
                                                    title={"Editar"}
                                                    destroyOnHidden={true}
                                                >
                                                    <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditingName(true)}/>
                                                </Tooltip>
                                            </>
                                        ) 
                                        : (
                                            <>
                                                <span>{character.name}</span>
                                                <Tooltip
                                                    title={"Editar"}
                                                    destroyOnHidden={true}
                                                >
                                                    <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditingName(true)}/>
                                                </Tooltip>
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
                                <Tooltip
                                    title={"Resetar"}
                                    destroyOnHidden={true}
                                >
                                    <UndoOutlined style={{fontSize: "18px", fontWeight: "bold", color: "var(--text-color-default)"}} onClick={() => setEditedHP(null)}/>
                                </Tooltip>
                                <InputNumber 
                                    className={`field-default input-default`} 
                                    mode="spinner" 
                                    style={{width: "20%"}} 
                                    size={"small"} 
                                    min={50} 
                                    max={500} 
                                    value={editedHP !== null ? editedHP : character.stats.hp} 
                                    onChange={(value) => setEditedHP(value ?? character.stats.hp)}
                                />
                                <div className={`${styles["stat-bar"]}`}>
                                    <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                    <div className={`${styles["stat-value"]}`}>
                                        {editedHP !== null
                                        ? (<span>{editedHP}</span>)
                                        : (<span>{character.stats.hp}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["stat-item"]}`} data-stat={`atk`}>
                                <div className={`stat-icon`}>
                                    <img src={`${BASE_ATTRIBUTES_URL}/for_atk.png`} />
                                </div>
                                <span className={`${styles["stat-spacing"]}`}>//</span>
                                <div className={`${styles["stat-name"]}`}>Ataque</div>
                                <Tooltip
                                    title={"Resetar"}
                                    destroyOnHidden={true}
                                >
                                    <UndoOutlined style={{fontSize: "18px", fontWeight: "bold", color: "var(--text-color-default)"}} onClick={() => setEditedATK(null)}/>
                                </Tooltip>
                                <InputNumber 
                                    className={`field-default input-default`} 
                                    mode="spinner" style={{width: "20%"}} 
                                    size={"small"} 
                                    min={5} 
                                    max={50} 
                                    value={editedATK !== null ? editedATK : character.stats.atk}
                                    onChange={(value) => setEditedATK(value ?? character.stats.atk)}
                                />
                                <div className={`${styles["stat-bar"]}`}>
                                    <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                    <div className={`${styles["stat-value"]}`}>
                                        {editedATK !== null
                                        ? (<span>{editedATK}</span>)
                                        : (<span>{character.stats.atk}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["stat-item"]}`} data-stat={`def`}>
                                <div className={`stat-icon`}>
                                    <img src={`${BASE_ATTRIBUTES_URL}/for_def.png`} />
                                </div>
                                <span className={`${styles["stat-spacing"]}`}>//</span>
                                <div className={`${styles["stat-name"]}`}>Defesa</div>
                                <Tooltip
                                    title={"Resetar"}
                                    destroyOnHidden={true}
                                >
                                    <UndoOutlined style={{fontSize: "18px", fontWeight: "bold", color: "var(--text-color-default)"}} onClick={() => setEditedDEF(null)}/>
                                </Tooltip>
                                <InputNumber 
                                    className={`field-default input-default`} 
                                    mode="spinner" style={{width: "20%"}} 
                                    size={"small"} 
                                    min={5}
                                    max={50}  
                                    value={editedDEF !== null ? editedDEF : character.stats.def} 
                                    onChange={(value) => setEditedDEF(value ?? character.stats.def)}
                                />
                                <div className={`${styles["stat-bar"]}`}>
                                    <div className={`${styles["stat-fill"]}`} style={{width: `100%`}}></div>
                                    <div className={`${styles["stat-value"]}`}>
                                        {editedDEF !== null
                                        ? (<span>{editedDEF}</span>)
                                        : (<span>{character.stats.def}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles["details-section-title"]}`}>Descrição do Personagem:</div>
                        <div className={`${styles["description-container"]}`}>
                            <div 
                                ref={descriptionRef}
                                className={`${styles["description-textbox"]}`} 
                                contentEditable={isEditingDescription}
                                suppressContentEditableWarning
                                onClick={handleStartEditingDescription}
                            >
                                {isEditingDescription
                                    ? editedDescription !== null
                                        ? editedDescription
                                        : character.description ?? ""
                                    : displayedDescription
                                }
                            </div>                      
                            <div className={`${styles["description-edit-actions"]}`}>
                                <Tooltip 
                                    title={"Resetar Descrição"}
                                    destroyOnHidden={true}
                                >
                                    <UndoOutlined style={{fontSize: "18px", fontWeight: "bold", color: "var(--text-color-default)"}} onClick={handleResetDescription}/>
                                </Tooltip>
                                {isEditingDescription && (
                                    <div className={`${styles["description-main-actions"]}`}>
                                        <Tooltip 
                                            title={`Confirmar Edição`}
                                            destroyOnHidden={true}
                                        >
                                            <span className={`${styles["edit-actions"]}`} style={{color: "#00ff40"}} onClick={handleConfirmEditDescription}>✓</span>
                                        </Tooltip>
                                        <Tooltip
                                            title={`Cancelar Edição`}
                                            destroyOnHidden={true}
                                        >
                                            <span className={`${styles["edit-actions"]}`} style={{color: "#ff5656"}} onClick={handleCancelEditDescription}>✕</span>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-options`}>
                    <Button type="primary" className={`btn-default primary-btn`} onClick={handleConfirmEditModal} >Confirmar</Button>
                    <Button type="primary" className={`btn-default danger-btn`} onClick={handleClose} >Cancelar</Button>
                </div>
            </Modal>
            <ImageCropModal 
                open={isCropOpen}
                onApply={handleCropApply}
                onClose={handleCropClose}
                image={cropTarget?.image ?? null}
                cropOptions={cropTarget?.options}
            />
        </>
    )
};

export default CharacterEditModal;