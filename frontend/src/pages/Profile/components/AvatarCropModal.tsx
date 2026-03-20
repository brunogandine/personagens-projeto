import { Button, Modal, Slider } from "antd";
import { useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { PictureFilled } from "@ant-design/icons";
import styles from "../Profile.module.css";

type AvatarCropModalProps = {
    open: boolean,
    onClose: () => void,
    onApply: (blob: Blob) => void;
    image: string | null
}

const AvatarCropModal = ({ open, onClose, onApply, image }: AvatarCropModalProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0})
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const resetCropState = () => {
        setCrop({
            x: 0,
            y: 0
        })
        setZoom(1);
        setCroppedAreaPixels(null)
    }

    const handleCancel = () => {
        resetCropState();
        onClose();
    }

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleConfirm = async () => {
        if(!image || !croppedAreaPixels)
            return;

        const blob = await getCroppedImg(image, croppedAreaPixels);

        if(!blob)
            return;

        onApply(blob);
    }

    useEffect(() => {
        if(!open) {
            resetCropState();
        }
    }, [open])

    return (
        <Modal className={`${styles["crop-modal"]}`} title="Editar imagem" open={open} onCancel={handleCancel} onOk={handleConfirm} footer={null}>
            <>
                {image && (
                    <div className={`${styles["crop-container"]}`} style={{position: "relative", width: "100%", height: "300px"}}>
                        <Cropper 
                            image={image} 
                            crop={crop} 
                            zoom={zoom} 
                            aspect={1} 
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop} 
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete} 
                        />
                    </div>

                    )
                }
                <div className={`${styles["zoom-range"]}`} style={{marginTop: 16}}>
                    <PictureFilled style={{color: "#C1C1C1"}}/>
                    <Slider 
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(value) => setZoom(value)}
                        tooltip={{open: false}}
                    />
                    <PictureFilled style={{color: "#C1C1C1", fontSize: "25px"}} />
                </div>
                <div className={`${styles['bottom-crop-modal']}`}>
                    <Button className={`${styles["cancel-btn"]}`} onClick={handleCancel}>Cancelar</Button>
                    <Button className={`${styles["apply-btn"]}`} onClick={handleConfirm}>Aplicar</Button>
                </div>
            </>
        </Modal>
    )
};

export default AvatarCropModal;