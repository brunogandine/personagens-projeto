import { Avatar, Modal } from "antd";
import styles from "../Profile.module.css";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import type { RecentAvatar } from "../types/ProfileTypes";

type AvatarOptionsModalProps = {
    open: boolean,
    onClose: () => void;
    onChooseImage: () => void;
    recentAvatars: RecentAvatar[];
    onSelectRecentAvatar: (avatar: RecentAvatar) => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL

const AvatarOptionsModal = ({ open, onClose, onChooseImage, recentAvatars, onSelectRecentAvatar }: AvatarOptionsModalProps) => {
    const slots = Array.from({ length: 6 }, (_, index) => recentAvatars[index] ?? null);

    return (
        <Modal title="Selecione uma imagem" className={`${styles['avatar-modal']}`} closable open={open} onCancel={onClose} footer={null}>
            <div className={`${styles["options-modal-content"]}`}>
                <div className={`${styles["upload-image"]}`} onClick={onChooseImage}>
                    <UploadOutlined className={`${styles["upload-icon"]}`} style={{fontSize: '24px'}} />
                    <span className={`${styles["upload-image-txt"]}`}>Enviar Imagem</span>
                </div>
                <div className={`${styles["last-uploads"]}`}>
                    <span className={`${styles["last-uploads-title"]}`}>Últimos Avatares</span>
                    <div className={`${styles["last-uploads-content"]}`}>
                        {slots.map((avatar, index) => (
                            <div
                                key={avatar ? avatar.fileName : `empty-${index}`}
                                className={styles[`recent-slot`]}
                                onClick={() => avatar && onSelectRecentAvatar(avatar)}>
                                <Avatar 
                                    className={avatar ? `${styles["active-recent"]}` : `${styles["avatar-upload"]}`} 
                                    src={avatar ? `${BASE_URL}${avatar.avatarPath}` : undefined} 
                                    icon={<UserOutlined style={{fontSize: "40px"}}></UserOutlined>}>
                                </Avatar>
                                {avatar && (
                                    <div className={styles[`recent-overlay`]}></div>
                                )}
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default AvatarOptionsModal;