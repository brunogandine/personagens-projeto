import styles from "./Profile.module.css";
import { Avatar, Button } from "antd";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import EmailField from "../../components/Profile/EmailField";
import { useEffect, useRef, useState } from "react";
import type { RecentAvatar, ProfileStats } from "./types/ProfileTypes";
import { UserSection } from "./components/UserSection";
import { ProfileSections } from "./hooks/ProfileSections";
import AvatarOptionsModal from "./components/AvatarOptionsModal";
import AvatarCropModal from "./components/AvatarCropModal";
import ProfileChangePasswordModal from "./components/ProfileChangePasswordModal";
import { Request } from "@/services/apiClient";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const Profile = () => {
    const { user, setUser } = useAuth();
    const [stats, setStats] = useState<ProfileStats | null>(null);
    const [isProfileModalOptionsOpen, setIsProfileModalOptionsOpen] = useState(false);
    const [isProfileModalCropOpen, setIsProfileModalCropOpen] = useState(false);
    const [isProfileChangePasswordModalOpen, setIsProfileChangePasswordModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedSource, setSelectedSource] = useState<"upload" | "recent">("upload");
    const [recentAvatars, setRecentAvatars] = useState<RecentAvatar[]>([])

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const res = await Request.get<ProfileStats>(`/profile/stats`)

                if(!res)
                    throw new Error(`Erro ao carregar estatísticas.`)


                setStats(res.data)
            }catch(err) {
                console.error(err);
            }
        }

        loadStats();
    }, []);

    const loadRecentAvatars = async () => {
        try {
            const res = await Request.get<RecentAvatar[]>(`/users/me/avatar/recents`);

            if(!res)
                throw new Error(`Erro ao buscar avatares recentes.`)

            setRecentAvatars(res.data);
        }catch(err) {
            console.error(err)
        }
    };

    const handleOpenOptionsModal = async () => {
        setIsProfileModalOptionsOpen(true);

        try {
            await loadRecentAvatars();
        } catch(error) {
            console.error(error)
        }
    };

    const handleOpenPasswordChangeModal = async () => {
        setIsProfileChangePasswordModalOpen(true);
    }

    const handleChooseImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleCropModalClose = () => {
        setIsProfileModalCropOpen(false);
        setIsProfileModalOptionsOpen(true);
    }

    const handleSelectedAvatarFromRecents = (avatar: { fileName: string, avatarPath: string, updatedAt: string }) => {
        setIsProfileModalOptionsOpen(false);
        setSelectedImage(`${BASE_URL}${avatar.avatarPath}`);
        setSelectedSource("recent");
        setIsProfileModalCropOpen(true);
    };

    const validateImgFile = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const testUrl = URL.createObjectURL(file);
            const img = new Image();

            img.onload = () => {
                URL.revokeObjectURL(testUrl);
                resolve(true)
            };
            
            img.onerror = () => {
                URL.revokeObjectURL(testUrl);
                resolve(false);
            };

            img.src = testUrl;
        });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(!file)
            return;

        if(!ALLOWED_TYPES.includes(file.type)) {
            alert(`Tipo de Arquivo inválido.`);
            e.target.value = "";

            return
        };

        if(file.size > MAX_FILE_SIZE) {
            alert(`Tamanho máximo do arquivo excedido. Só são permitidas imagens de até 5mb.`);
            e.target.value = "";

            return;
        };

        const isValidImage = await validateImgFile(file);

        if(!isValidImage) {
            alert(`O arquivo selecionado não é uma imagem válida.`);
            e.target.value = "";
            
            return;
        };

        const imageUrl = URL.createObjectURL(file);

        setSelectedImage(imageUrl);
        setSelectedSource("upload");
        setIsProfileModalOptionsOpen(false);
        setIsProfileModalCropOpen(true);

        e.target.value = "";
    }

    useEffect(() => {
        return () => {
            if(selectedImage?.startsWith("blob:"))
                URL.revokeObjectURL(selectedImage);
        };
    }, [selectedImage]);

    const handleApplyAvatar = async (blob: Blob) => {
        try {
            const formData = new FormData();
            formData.append("avatar", blob);
            formData.append("source", selectedSource);

            const res = await Request.patch(
                `/users/me/avatar`,
                formData
            ).catch(() => null);

            if(!res)
                throw new Error(`Erro ao atualizar o avatar.`)

            if(!res.ok) {
                if(res.status === 401) {
                    alert("Sua sessão expirou. Faça login novamente.");
                    window.location.href = "/";
                }

                throw new Error(res.data?.message || "Erro ao enviar o avatar.")
            };

            setUser?.((prev) => {
                if(!prev)
                    return prev;

                return {
                    ...prev,
                    avatar_url: res.data.avatarUrl
                }
            } )

            setIsProfileModalCropOpen(false);
            setSelectedSource("upload")
            setIsProfileModalOptionsOpen(false);
        } catch(err) {
            console.error(err);

            if(err instanceof Error) {
                alert(err.message);
                return;
            }

            alert("Não foi possível atualizar o avatar.");
        };
    }

    if(!user || !stats) 
        return null;

    const sections = ProfileSections(user, stats);

    return (
        <div id={styles["user-profile"]}>
            <div className={styles["user-container"]}>
                <div className={styles["user-basic"]}>
                    <div className={`${styles["p-avatar"]} ${styles["pad-15"]} ${styles["border-b-1"]}`}>
                        <div className={`${styles["p-pic-wrap"]}`}>
                            <Avatar 
                                className={styles["p-pic"]} 
                                src={(user.avatar_url ? `${BASE_URL}${user.avatar_url}` : undefined)} 
                                icon={<UserOutlined style={{fontSize: "80px"}} />} 
                                onClick={handleOpenOptionsModal}
                            />
                            <div className={styles["p-overlay"]}>
                                <EditFilled style={{fontSize: "24px", color: "#C1C1C1"}}/>
                            </div>
                        </div>
                    
                        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display: "none"}} onChange={handleAvatarChange}/>
                        <AvatarOptionsModal 
                            open={isProfileModalOptionsOpen} 
                            onClose={() => setIsProfileModalOptionsOpen(false)} 
                            onChooseImage={handleChooseImageClick} 
                            recentAvatars={recentAvatars}
                            onSelectRecentAvatar={handleSelectedAvatarFromRecents}
                        />
                        <AvatarCropModal 
                            open={isProfileModalCropOpen} 
                            onClose={handleCropModalClose} 
                            onApply={handleApplyAvatar} 
                            image={selectedImage} 
                        />
                    </div>
                    <div className={`${styles["p-user"]} ${styles["pad-15"]}`}>
                        <div className={styles["p-username"]}>
                            <h2 className={user?.user_power === "Moderator" ? "green" : user?.user_power === "Admin" ? "orange" : ""}>{user?.username}</h2>
                        </div>
                        <div className={styles["p-email"]}>
                            <div className={styles["p-email-title"]}>E-mail</div>
                            <EmailField email={user?.email} />
                        </div>
                        <div className={styles["p-passChange"]} onClick={handleOpenPasswordChangeModal}>
                            <Button className={`${styles["simple-btn"]}`}>Mudar senha</Button>
                        </div>
                        <ProfileChangePasswordModal 
                            open={isProfileChangePasswordModalOpen} 
                            onClose={() => setIsProfileChangePasswordModalOpen(false)} 
                        />
                    </div>
                </div>
                <div className={styles["user-stats"]}>
                    <div className={`${styles["s-status"]} ${styles["pad-15"]} ${styles["border-b-1"]}`}>
                        <div className={styles["s-status-header"]}>
                            <UserOutlined style={{fontSize: "15px", marginRight: "3px"}}/>
                            <span style={{fontSize: "15px", fontWeight: 2}}>Status da Conta</span>
                        </div>
                        <div className={`${styles["s-status-light"]}`}>
                            <span className={`${styles["s-status-circle"]} ${styles["border"]} ${styles["border-green"]} ${styles["bg-green"]} ${styles["border-rounded"]} ${styles["glow-green"]}`}></span>
                            <span className={`${styles["s-status-text"]}`}>Ativa</span>
                        </div>
                    </div>
                    <div className={`${styles["s-user"]} ${styles["pad-15"]}`}>
                        {sections.map((section) => (
                            <UserSection
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                items={section.items}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;