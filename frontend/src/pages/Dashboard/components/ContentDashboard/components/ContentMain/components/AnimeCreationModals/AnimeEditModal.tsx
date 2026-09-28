import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ImageCropModal from "@/pages/Dashboard/shared/ImageCropModal";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import { EditFilled, PlusOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import type { AnimeEdit } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";
import type { ContentImageCacheKey } from "@/pages/Dashboard/components/ContentDashboard/components/ContentMain/ContentMain";
import { validateImageFile } from "@/helpers/validateImageFile";
import { Request } from "@/services/apiClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const BASE_ANIMES_PATH = "/assets/images/animes/"

type AnimeEditProps = {
    open: boolean;
    onClose: () => void;
    anime: AnimeEdit
    hide: () => void;
    reopen: () => void;
    onSuccessCallback: () => void;
    onChangeImage: (key: ContentImageCacheKey) => void;
    imageCacheVersion: number | null;
}

type CropAspectOptions = {
    width: number;
    height: number;
}

type CropData = {
    image: string;
    options: CropAspectOptions;
}

const AnimeEditModal = ({open, onClose, hide, reopen, anime, onSuccessCallback, onChangeImage, imageCacheVersion}: AnimeEditProps) => {
    const { showMessageModal, showToast } = useMessageModal();

    const [cropData, setCropData] = useState<CropData | null>(null);

    const [symbolLoadError, setSymbolLoadError] = useState(false);

    const [symbolPreview, setSymbolPreview] = useState<string | null>(null);
    const [symbolBlob, setSymbolBlob] = useState<Blob | null>(null);

    const [pendingRemoveSymbol, setPendingRemoveSymbol] = useState(false);

    const [draftName, setDraftName] = useState(anime.name);
    const [editedName, setEditedName] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(anime.active);
    const [editedDescription, setEditedDescription] = useState<string | null>(null);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const imageCacheQuery = imageCacheVersion !== null ? `?v=${imageCacheVersion}` : "";

    const symbolUrl = `${BASE_ANIMES_PATH}${anime.id}/symbol.jpg${imageCacheQuery}`;

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const editNameRef = useRef<HTMLDivElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setDraftName(anime.name);
        setIsActive(anime.active);
    }, [anime])

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

    const isCropOpen = cropData !== null;

    const uploadSymbol = () => {
        fileInputRef.current?.click();
    };

    const handleSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setCropData({
            image: imageUrl,
            options: {
                width: 66,
                height: 65
            }
        });

        e.target.value = "";
    };

    const handleRemoveSymbol = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()

        if(symbolLoadError)
            return;

        if(pendingRemoveSymbol)
            return setPendingRemoveSymbol(false);

        if(symbolPreview) {
            URL.revokeObjectURL(symbolPreview);

            setSymbolPreview(null);
            setSymbolBlob(null);

            return;
        };

        setPendingRemoveSymbol(true);
    };

    const handleCropClose = () => {
        cropData?.image && URL.revokeObjectURL(cropData.image)

        setCropData(null);
    };

    const handleCropApply = (blob: Blob) => {
        if(!cropData)
            return;

        if(symbolPreview)
            URL.revokeObjectURL(symbolPreview);

        setSymbolPreview(URL.createObjectURL(blob));
        setSymbolBlob(blob);
        setPendingRemoveSymbol(false);

        URL.revokeObjectURL(cropData.image);

        setCropData(null);
    };

    const handleConfirmEditName = () => {
        const name = draftName.trim();

        if(!name)
            return;

        if(name === anime.name) {
            if(editedName !== null) {
                setEditedName(null);
                setIsEditingName(false);
                return;
            } else {
                showToast({text: "O nome que inseriu é igual ao nome já registrado. Tente outro.", type: "error"});
                return;
            };
        };

        if(name === editedName) {
            showToast({text: "O nome que inseriu é o mesmo que está tentando editar. Tente outro.", type: "error"});
            return;
        };

        setEditedName(name);
        setIsEditingName(false);
    };

    const handleCancelEditName = () => {
        setDraftName(editedName !== null ? editedName : anime.name);
        setIsEditingName(false);
    };

    const currentDescription = 
        editedDescription !== null
            ? editedDescription
            : anime.description ?? ""

    const displayedDescription = currentDescription.trim() || "Sem descrição";

    const handleStartEditingDescription = () => {
        if(isEditingDescription)
            return;

        setIsEditingDescription(true);

        if(descriptionRef.current)
            descriptionRef.current.innerText =
                editedDescription !== null 
                    ? editedDescription
                    : anime.description ?? "null"
    };

    const handleResetDescription = () => {
        if(editedDescription === null)
            return;

        setEditedDescription(null);
        setIsEditingDescription(false);

        if(descriptionRef.current)
            descriptionRef.current.innerText =
                anime.description ?? ""
    };

    const handleConfirmEditDescription = () => {
        const description = descriptionRef.current?.innerText.trim() ?? "";

        setEditedDescription(description);
        setIsEditingDescription(false);
    };

    const handleCancelEditDescription = () => {
        if(descriptionRef.current)
            descriptionRef.current.innerText =
                editedDescription !== null
                    ? editedDescription
                    : anime.description ?? "";

        setIsEditingDescription(false);
    };
 
    const buildEditPayload = () => {
        const formData = new FormData();

        if(symbolBlob !== null) {
            formData.append("symbol", symbolBlob);
        } else if(pendingRemoveSymbol)
            formData.append("remove_symbol", String(pendingRemoveSymbol));

        if(editedName !== null)
            formData.append("name", editedName);

        if(isActive !== anime.active)
            formData.append("active", String(isActive));

        if(editedDescription !== null)
            formData.append("description", editedDescription);

        if([...formData.entries()].length === 0)
            return null;

        return formData;
    };

    const handleConfirmEdit = async () => {
        if(isEditingDescription)
            return showToast({
                type: "warning",
                text: "Há uma edição em andamento na descrição do anime. Confirme ou Cancele antes de aplicar as alterações."
            });

        const payload = buildEditPayload();

        if(payload === null) 
            return showToast({
                text: "Nenhuma alteração foi feita.",
                type: "error"
            });
        
        const imageChanged = 
            symbolBlob ||
            pendingRemoveSymbol

        const res = await Request.patch(`/animes/${anime.id}`, payload);

        if(!res.ok) {
            if(res.status === 400) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message,
                        list: res.data.errors
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };

            if(res.status === 404) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };

            if(res.status === 500) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message,
                        instructions: "Tente Novamente."
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                return;
            };
        };

        if(res.data.errors) {
            if(res.data.type === "storage") {
                showMessageModal({
                    data: {
                        type: "warning",
                        description: "O anime foi atualizado com sucesso, mas ocorreram erros ao salvar uma ou mais imagens:",
                        list: res.data.errors,
                        instructions: "Tente novamente."
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });
            }

            resetStates();
            onClose();

            return;
        };

        if(imageChanged)
            onChangeImage(`anime:${anime.id}`);

        showToast({
            text: res.data.message,
            type: "success"
        });

        resetStates();
        onSuccessCallback();
        onClose();
    };

    const handleDismiss = () => {
        onClose();
    };

   const resetStates = () => {
        if(symbolPreview) {
            URL.revokeObjectURL(symbolPreview);

            setSymbolPreview(null);
            setSymbolBlob(null);
        };

        if(pendingRemoveSymbol)
            setPendingRemoveSymbol(false);

        setEditedName(null);

        setIsActive(anime.active);

        setEditedDescription(null);

        setIsEditingName(false);
        setIsEditingDescription(false);
    };

    const handleClose = () => {
        resetStates();
        onClose();
    };

    return (
        <>
            <Modal
                wrapClassName={`modal-default`}
                title={`Criar Anime`}
                open={open && !isCropOpen}
                onCancel={handleDismiss}
                footer
            >
                <div className={`${styles["update-anime-modal-content"]}`} >
                    <div className={`${styles["update-anime-top"]}`}>
                        <div className={`${styles["anime-symbol"]}`}>
                            <div className={`upload-symbol`} onClick={uploadSymbol} onChange={handleSymbol} onContextMenu={handleRemoveSymbol} >
                                {symbolPreview ? (<img src={symbolPreview} />)
                                : symbolLoadError ? (                                        
                                        <div className={`${styles["empty-upload"]} ${styles["symbol"]}`} > 
                                            <PlusOutlined style={{color: "var(--text-color-primary)", fontSize: "30px"}}/>                                
                                        </div>
                                    ) : pendingRemoveSymbol ? (
                                        <div className={`${styles["empty-upload"]} ${styles["symbol"]}`} > 
                                            <PlusOutlined style={{color: "var(--text-color-primary)", fontSize: "30px"}}/>                                
                                        </div>
                                    ) : (<img src={symbolUrl} onError={() =>  setSymbolLoadError(true)} />)
                                }
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" style={{display: "none"}} />
                            </div>
                            {symbolPreview ? "" : symbolLoadError ? (<span style={{color: "var(--orange-500)", fontSize: "16px", fontWeight: "bold"}}>Carregar Símbolo</span>) : pendingRemoveSymbol ? (<span style={{color: "var(--orange-500)", fontSize: "16px", fontWeight: "bold"}}>Carregar Símbolo</span>) : "" }
                        </div>
                        <div className={`${styles["update-anime-info"]}`}>
                            <div className={`${styles["name-wrapper"]}`} >
                                <label htmlFor="anime-name" className={`input-label-default`}>Nome do Anime:</label>
                                {isEditingName 
                                    ? (                                
                                    <div className={`${styles["update-input-wrapper"]}`} ref={editNameRef}>
                                        <Input 
                                            id="anime-name" 
                                            className={`field-default ${styles["edit-input"]}`} 
                                            style={{width: `70%`, maxWidth: "200px"}} 
                                            value={draftName} 
                                            onChange={(e) => setDraftName(e.target.value) } 
                                        />
                                        <span className={`${styles["edit-actions"]}`} style={{color: "#00ff40"}} onClick={handleConfirmEditName}>✓</span>
                                        <span className={`${styles["edit-actions"]}`} style={{color: "#ff5656"}} onClick={handleCancelEditName}>✕</span>
                                    </div>
                                    ) : (editedName !== null
                                        ? (                                            
                                            <>
                                                <div className={`${styles["span-wrapper"]}`}>
                                                    <span style={{color: "var(--orange-500)", fontWeight: "bold"}}>{editedName}</span>
                                                    <Tooltip
                                                        title={"Editar"}
                                                        destroyOnHidden={true}
                                                    >
                                                        <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditingName(true)}/>
                                                    </Tooltip>
                                                    <span style={{color: "var(--red-100)"}}>*</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`${styles["span-wrapper"]}`}>
                                                    <span>{anime.name}</span>
                                                    <Tooltip
                                                        title={"Editar"}
                                                        destroyOnHidden={true}
                                                    >
                                                        <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditingName(true)}/>
                                                    </Tooltip>
                                                </div>
                                            </>
                                        )
                                    )
                                }
                            </div>
                            <div className={`${styles["active-wrapper"]}`}>
                                <CheckboxComponent id="anime-active" checked={isActive} onToggle={() => setIsActive(!isActive)} />
                                <label htmlFor="anime-active" className={`input-label-default`}>Ativo</label>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["create-anime-bottom"]}`}>
                        <div className={`${styles["update-anime-description"]}`}>
                            <div className={`${styles["description-wrapper"]}`}>
                                <label htmlFor="anime-description" className={`input-label-default`}>Descrição do Anime:</label>
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
                                            : anime.description ?? ""
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
                </div>
                <div className={`modal-options`}>
                    <Button type="primary" className={`btn-default primary-btn`} onClick={handleConfirmEdit} >Confirmar</Button>
                    <Button type="primary" className={`btn-default danger-btn`} onClick={handleClose} >Cancelar</Button>
                </div>
            </Modal>
            <ImageCropModal 
                open={isCropOpen}
                onClose={handleCropClose}
                onApply={handleCropApply}
                image={cropData?.image ?? null}
                cropOptions={cropData?.options}
            />
        </>
    )
}

export default AnimeEditModal;