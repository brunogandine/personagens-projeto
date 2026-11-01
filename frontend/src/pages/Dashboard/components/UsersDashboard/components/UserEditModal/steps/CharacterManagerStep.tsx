import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { DownOutlined, FilterTwoTone, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UserCharacter } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";

type Props = {
    userId: number;
    count: number;
    onOpenCharacterConfig: () => void;
}

const CharacterManagerStep = ({userId, count, onOpenCharacterConfig}: Props) => {
    const [characters, setCharacters] = useState<UserCharacter[]>([]);

    const { showToast } = useMessageModal();

    useEffect(() => {
        if(count === 0)
            return;

        getUserCharacters();
    }, []);

    const getUserCharacters = async () => {
        const res = await Request.get(`/users/${userId}/characters`);

        if(!res.ok) {
            showToast({
                type: "error",
                text: res.data.message,
            });

            return;
        };

        setCharacters(res.data);
    };

    return (
        <>
            <div className={`${styles["edit-single-character-manager"]}`}>
                <div className={`${styles["character-manager-search"]}`}>
                    <div className={`${styles["search-wrapper"]}`}>
                        <SearchOutlined style={{fontSize: "18px"}} />
                        <input className={`field-default ${styles["search-bar"]}`} type="text" placeholder="Pesquisar Personagens"/>
                    </div>
                    <div className={`${styles["character-search-filter"]}`}>
                        <FilterTwoTone style={{fontSize: "18px"}} twoToneColor={["#7385ff", "transparent"]}/>
                        Filtros
                        <DownOutlined style={{fontSize: "12px"}} />
                    </div>
                </div>
                <div className={`${styles["edit-single-character-manager-container"]}`}>
                    {characters.length > 0 ? (
                        <div className={`${styles["edit-single-character-manager-items"]}`}>
                            {characters.map((c) => (
                                <div className={`${styles["edit-single-character-manager-item"]}`} onClick={onOpenCharacterConfig} >
                                    <div className={`${styles["thumbnail"]}`}>
                                        <img src={`/assets/images/cards/${c.character_id}/thumbnail/1/1.png`} />
                                    </div>
                                    <div className={`${styles["info"]}`}>
                                        <div className={`${styles["info-container"]}`}>
                                            <span>{c.character_name}</span>
                                            <span style={{color: "#00eeff"}}>Sparking</span>
                                            <span>Lv. {c.level}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["exp"]}`}>
                                        <div className={`${styles["exp-bar"]}`}>
                                            <div className={`${styles["bar"]}`}>
                                                <div style={{width: "0%"}} className={`${styles["fill-bar"]}`}>

                                                </div>
                                            </div>
                                        </div>
                                        <span style={{fontSize: "10px"}}>{c.exp}/500</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (                    
                        <div className={`${styles["no-items"]}`}>
                            <TeamOutlined style={{backgroundColor: "var(--bg-default)", fontSize: "26px", borderRadius: "18px", padding: "5px"}}/>
                            <span style={{fontSize: "12px", fontWeight: "bold"}}>Nenhum personagem na conta ainda.</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CharacterManagerStep;