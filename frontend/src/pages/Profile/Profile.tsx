import styles from "./Profile.module.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/LoggedUserContext";
import EmailField from "../../components/Profile/EmailField";
import { useEffect, useState } from "react";
import type { ProfileStats } from "./types/ProfileTypes";
import { UserSection } from "./components/UserSection";
import { ProfileSections } from "./hooks/ProfileSections";

const Profile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<ProfileStats | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            const res = await fetch("http://localhost:3000/api/profile/stats", {
                credentials: "include"
            })

            const stats: ProfileStats = await res.json();
            setStats(stats);
            console.log(stats)
        }

        loadStats();
    }, []);

    if(!user || !stats) return null;

    const sections = ProfileSections(user, stats);

    return (
        <div id={styles["user-profile"]}>
            <div className={styles["user-container"]}>
                <div className={styles["user-basic"]}>
                    <div className={`${styles["p-avatar"]} ${styles["pad-15"]} ${styles["border-b-1"]}`}>
                        <Avatar className={styles["p-pic"]} icon={<UserOutlined style={{fontSize: "80px"}} />}/>
                        <div className={styles["p-pic-options"]}>
                            <span style={{fontSize: "12px", justifySelf: "end"}}>Alterar</span>
                            <span style={{}}>|</span>
                            <span style={{fontSize: "12px"}}>Remover</span>
                        </div>
                    </div>
                    <div className={`${styles["p-user"]} ${styles["pad-15"]}`}>
                        <div className={styles["p-username"]}>
                            <h2 className={user?.user_power === "Moderator" ? "green" : user?.user_power === "Admin" ? "orange" : ""}>{user?.username}</h2>
                        </div>
                        <div className={styles["p-email"]}>
                            <div className={styles["p-email-title"]}>Email:</div>
                            <EmailField email={user?.email} />
                        </div>
                        <div className={styles["p-passChange"]}>
                            <p>Alterar Senha</p>
                        </div>
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