import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ImageCropModal from "@/pages/Dashboard/shared/ImageCropModal";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import { validateImageFile } from "@/helpers/validateImageFile";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useRef, useState } from "react";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";

type AnimeCreationProps = {
    open: boolean;
    onClose: () => void;
    hide: () => void;
    reopen: () => void;
    onSuccessCallback: () => void;
}

type CropAspectOptions = {
    width: number;
    height: number;
}

type CropData = {
    image: string;
    options: CropAspectOptions;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const AnimeCreationModal = ({open, onClose, hide, reopen, onSuccessCallback}: AnimeCreationProps) => {
    const { showMessageModal, showToast } = useMessageModal();

    const [animeName, setAnimeName] = useState("");
    const [animeDescription, setAnimeDescription] = useState("");
    const [animeActive, setAnimeActive] = useState(false);

    const [cropData, setCropData] = useState<CropData | null>(null);

    const [symbolImagePreview, setSymbolImagePreview] = useState<string | null>(null);
    const [symbolImageBlob, setSymbolImageBlob] = useState<Blob | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const isCropOpen = cropData !== null;

    const uploadSymbol = () => {
        fileInputRef.current?.click();
    };

    const handleSymbolUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleRemoveUpload = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        if(symbolImagePreview) {
            URL.revokeObjectURL(symbolImagePreview);

            setSymbolImagePreview(null);
            setSymbolImageBlob(null);

            return;
        };
    }

    const handleCropClose = () => {
        cropData?.image && URL.revokeObjectURL(cropData.image);

        setCropData(null);
    };

    const handleCropApply = (blob: Blob) => {
        if(!cropData)
            return;

        if(symbolImagePreview)
            URL.revokeObjectURL(symbolImagePreview);

        setSymbolImagePreview(URL.createObjectURL(blob));
        setSymbolImageBlob(blob);

        URL.revokeObjectURL(cropData.image);

        setCropData(null);
    };

    const resetForm = () => {
        setAnimeName("");
        setAnimeDescription("");
        setAnimeActive(false);

        if(symbolImagePreview) {
            URL.revokeObjectURL(symbolImagePreview);

            setSymbolImagePreview(null);
            setSymbolImageBlob(null);
        };
    };

    const handleDismiss = () => {
        onClose();
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const buildCreateAnimePayload = () => {
        const formData = new FormData();

        if(symbolImageBlob !== null)
            formData.append("symbol", symbolImageBlob);

        if(animeDescription.trim())
            formData.append("description", animeDescription);

        formData.append("name", animeName);
        formData.append("active", String(animeActive));

        return formData;
    };

    const handleConfirmCreateAnime = async () => {
        const payload = buildCreateAnimePayload();

        const res = await Request.post("/animes", payload);

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

            if(res.status === 409) {
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
                        description: res.data.message
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
                        description: "O anime foi criado com sucesso, mas ocorreram errors ao salvar a imagem de símbolo do anime.",
                        list: res.data.errors,
                        instructions: "Tente novamente."
                    },
                    hidePreviousModal: hide,
                    reopenPreviousModal: reopen
                });

                handleClose();

                return;
            };
        };

        showToast({
            type: "success",
            text: res.data.message
        });

        onSuccessCallback();
        handleClose();

        return;
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
                <div className={`${styles["create-anime-modal-content"]}`} >
                    <div className={`${styles["create-anime-top"]}`}>
                        <div className={`${styles["anime-symbol"]}`}>
                            <div className={`upload-symbol`} onClick={uploadSymbol} onContextMenu={handleRemoveUpload} >
                                {symbolImagePreview 
                                    ? (<img src={symbolImagePreview} />)
                                    : (
                                        <div className={`${styles["empty-upload"]} ${styles["symbol"]}`} > 
                                            <PlusOutlined style={{color: "var(--text-color-primary)", fontSize: "30px"}}/>                                
                                        </div>
                                    )
                                }
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" style={{display: "none"}} onChange={handleSymbolUpload} />
                            </div>
                            <span style={{color: "var(--orange-500)", fontSize: "16px", fontWeight: "bold"}}>Carregar Símbolo</span>
                        </div>
                        <div className={`${styles["anime-info"]}`}>
                            <div className={`${styles["name-wrapper"]}`} >
                                <label htmlFor="anime-name" className={`input-label-default`}>Nome do Anime:</label>
                                <Input id="anime-name" className={`field-default`} style={{width: `70%`, maxWidth: "200px"}} value={animeName} onChange={(e) => setAnimeName(e.target.value) } />
                            </div>
                            <div className={`${styles["active-wrapper"]}`}>
                                <CheckboxComponent id="anime-active" checked={animeActive} onToggle={() => setAnimeActive(!animeActive)} />
                                <label htmlFor="anime-active" className={`input-label-default`}>Ativo</label>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["create-anime-bottom"]}`}>
                        <div className={`${styles["anime-description"]}`}>
                            <div className={`${styles["description-wrapper"]}`}>
                                <label htmlFor="anime-description" className={`input-label-default`}>Descrição do Anime:</label>
                                <textarea id="anime-description" className={`input-text-default`} value={animeDescription} onChange={(e) => setAnimeDescription(e.target.value)} rows={4}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-options`}>
                    <Button type="primary" className={`btn-default primary-btn`} onClick={handleConfirmCreateAnime} >Confirmar</Button>
                    <Button type="primary" className={`btn-default danger-btn`} onClick={handleClose} >Cancelar</Button>
                </div>
            </Modal>
            <ImageCropModal 
                open={isCropOpen}
                onApply={handleCropApply}
                onClose={handleCropClose}
                image={cropData?.image ?? null}
                cropOptions={cropData?.options}
            />
        </>
    )
}

export default AnimeCreationModal;