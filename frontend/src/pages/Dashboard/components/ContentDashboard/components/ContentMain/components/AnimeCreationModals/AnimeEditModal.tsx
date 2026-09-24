import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ImageCropModal from "@/pages/Dashboard/shared/ImageCropModal";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import { useRef, useState } from "react";
import type { AnimeEdit } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import type { ContentImageCacheKey } from "../../ContentMain";

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

const AnimeEditModal = ({open, onClose, hide, reopen, anime, onSuccessCallback, imageCacheVersion}: AnimeEditProps) => {
    const [cropData, setCropData] = useState<CropData | null>(null);

    const [symbolLoadError, setSymbolLoadError] = useState(false);

    const [symbolPreview, setSymbolPreview] = useState<string | null>(null);

    const [pendingRemoveSymbol, setPendingRemoveSymbol] = useState(false);

    const [draftName, setDraftName] = useState(anime.name);
    const [editedName, setEditedName] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(anime.active);
    const [editedDescription, setEditedDescription] = useState<string | null>(null);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const imageCacheQuery = imageCacheVersion !== null ? `?v=${imageCacheVersion}` : "";

    const symbolUrl = `${BASE_ANIMES_PATH}${anime.id}/symbol.png${imageCacheQuery}`;

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const editNameRef = useRef<HTMLDivElement | null>(null);

    const isCropOpen = cropData !== null;

    const uploadSymbol = () => {
        fileInputRef.current?.click();
    };

    const handleDismiss = () => {
        onClose();
    };

    const handleClose = () => {
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
                <div className={`${styles["edit-anime-modal-content"]}`} >
                    <div className={`${styles["edit-anime-top"]}`}>
                        <div className={`${styles["anime-symbol"]}`}>
                            <div className={`upload-symbol`} onClick={uploadSymbol} >
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
                            <span style={{color: "var(--orange-500)", fontSize: "16px", fontWeight: "bold"}}>Carregar Símbolo</span>
                        </div>
                        <div className={`${styles["anime-info"]}`}>
                            <div className={`${styles["name-wrapper"]}`} >
                                <label htmlFor="anime-name" className={`input-label-default`}>Nome do Anime:</label>
                                {isEditingName 
                                    ? (                                
                                    <div ref={editNameRef}>
                                        <Input id="anime-name" className={`field-default`} style={{width: `70%`, maxWidth: "200px"}} value={draftName} onChange={(e) => setDraftName(e.target.value) } />
                                    </div>
                                    ) : (editedName !== null
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
                                        ) : (
                                            <>
                                                <span>{anime.name}</span>
                                                <Tooltip
                                                    title={"Editar"}
                                                    destroyOnHidden={true}
                                                >
                                                    <EditFilled style={{cursor: "pointer"}} onClick={() =>  setIsEditingName(true)}/>
                                                </Tooltip>
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
                        <div className={`${styles["anime-description"]}`}>
                            <div className={`${styles["description-wrapper"]}`}>
                                <label htmlFor="anime-description" className={`input-label-default`}>Descrição do Anime:</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-options`}>
                    <Button type="primary" className={`btn-default primary-btn`} >Confirmar</Button>
                    <Button type="primary" className={`btn-default danger-btn`} onClick={handleClose} >Cancelar</Button>
                </div>
            </Modal>
        </>
    )
}

export default AnimeEditModal;