import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { FilterTwoTone, PlusOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UserCharacter, UserCharactersFilters } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import DashboardPagination from "@/pages/Dashboard/shared/DashboardPagination";

type Props = {
    userId: number;
    count: number;
    onOpenCharacterConfig: (character: UserCharacter) => void;
    openFilters: () => void;
    filters: UserCharactersFilters;
}

const CharacterManagerStep = ({userId, count, onOpenCharacterConfig, openFilters, filters}: Props) => {
    const [characters, setCharacters] = useState<UserCharacter[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchDebounce, setSearchDebounce] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const { showToast } = useMessageModal();

    useEffect(() => {
        if(count === 0)
            return;

        getUserCharacters();
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setSearchDebounce(search);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    },[search]);

    useEffect(() => {
        getUserCharacters();
    }, [page, searchDebounce]);

    const getUserCharacters = async () => {
        const res = await Request.get(`/users/${userId}/characters`, {
            query: {
                page,
                search: searchDebounce,
                ...filters
            }
        });

        if(!res.ok) {
            showToast({
                type: "error",
                text: res.data.message,
            });

            return;
        };

        setCharacters(res.data.data);
        setTotalPages(res.data.meta.totalPages);
    };

    const getCharacterExpPercentage = (exp: number, maxExp: number) => {
        return (exp / maxExp) * 100;
    };

    return (
        <>
            <div className={`${styles["edit-single-character-manager"]}`}>
                <div className={`${styles["character-manager-search"]}`}>
                    <div className={`${styles["search-wrapper"]}`}>
                        <SearchOutlined style={{fontSize: "18px"}} />
                        <input 
                            className={`field-default ${styles["search-bar"]}`} 
                            type="text" 
                            placeholder="Pesquisar Personagens" 
                            value={search} 
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }} 
                        />
                    </div>
                    <div className={`${styles["character-search-filter"]}`} onClick={openFilters} >
                        <FilterTwoTone style={{fontSize: "18px"}} twoToneColor={["#7385ff", "transparent"]}/>
                        Filtros
                    </div>
                    <div className={`${styles["character-add"]}`}>
                        <PlusOutlined style={{fontSize: "18px", color: "#7385ff"}} />
                    </div>
                </div>
                <div className={`${styles["edit-single-character-manager-container"]}`}>
                    {characters.length > 0 ? (
                        <>
                            <div className={`${styles["edit-single-character-manager-items"]}`}>
                                {characters.map((c) => {
                                    const expPercentage = getCharacterExpPercentage(c.exp, 500);

                                    return (
                                        <div key={c.id} className={`${styles["edit-single-character-manager-item"]}`} onClick={() => onOpenCharacterConfig(c)} >
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
                                                        <div style={{width: `${expPercentage}%`}} className={`${styles["fill-bar"]}`}>

                                                        </div>
                                                    </div>
                                                </div>
                                                <span style={{fontSize: "10px"}}>{c.exp}/500</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {totalPages > 1 && (
                                <DashboardPagination
                                    style={{alignSelf: "center"}}
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                    range={{start: 3, end: 2}}
                                />
                            )}
                        </>
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