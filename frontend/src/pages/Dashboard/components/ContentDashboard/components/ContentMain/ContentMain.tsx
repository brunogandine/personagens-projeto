import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import ContentItemComponent from "@/pages/Dashboard/components/ContentDashboard/ContentItem";
import DashboardPagination from "@/pages/Dashboard/shared/DashboardPagination";
import ContentOptions from "@/pages/Dashboard/components/ContentDashboard/ContentOptions";
import CharacterEditModal from "./components/CharacterEditModal";
import { toggleId, toggleBoolean } from "@/utils/toggle";
import { PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import type { AnimeItem, AnimeItemViewModel, CharacterEdit, CharacterItem, CharacterItemViewModel } from "@/pages/Dashboard/components/ContentDashboard//types/content.types";

export const BASE_ATTRIBUTES_URL = "/assets/images/icons/attributes";

const ContentMain = () => {
    const { showMessageModal } = useMessageModal();

    const BASE_DASHBOARD_CONTENT_URL = `/dashboard/content`;

    const [charactersPage, setCharactersPage] = useState(1);
    const [animesPage, setAnimesPage] = useState(1);

    const [totalCharactersPage, setTotalCharactersPage] = useState(1)
    const [totalAnimesPage, setTotalAnimesPage] = useState(1)

    const [charactersSearch, setCharactersSearch] = useState("");
    const [animesSearch, setAnimesSearch] = useState("");

    const [characters, setCharacters] = useState<CharacterItem[]>([]);
    const [animes, setAnimes] = useState<AnimeItem[]>([]);

    const [charactersDebounceSearch, setCharactersDebounceSearch] = useState("");
    const [animesDebounceSearch, setAnimeDebounceSearch] = useState("");

    const [selectedAnimes, setSelectedAnimes] = useState<number[]>([]);
    const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalCharacter, setEditModalCharacter] = useState<CharacterEdit | null>(null)

    const { user } = useAuth();

    if(!user)
        return null;

    const getCharacters = async () => {
        try{
            const response = await Request.get("/characters", {
                query: {
                    page: charactersPage,
                    search: charactersSearch
                }
            });

            setCharacters(response.data.data);
            setTotalCharactersPage(response.data.meta.totalPages);
            setSelectedCharacters([])
        }catch(err) {
            setCharacters([]);
            setSelectedCharacters([]);
        }
    };

    const getAnimes = async () => {
        try{
            const response = await Request.get("/animes", {
                query: {
                    page: animesPage,
                    search: animesSearch
                }
            })

            setAnimes(response.data.data);
            setTotalAnimesPage(response.data.meta.totalPages);
            setSelectedAnimes([]);
        }catch(err) {
            setAnimes([]);
            setSelectedAnimes([]);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setCharactersDebounceSearch(charactersSearch);

        }, 500);

        return () => clearTimeout(timer);
    }, [charactersSearch]);

    useEffect(() => {
        getCharacters();

    }, [charactersPage, charactersDebounceSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimeDebounceSearch(animesSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [animesSearch]);

    useEffect(() => {
        getAnimes();

    }, [animesPage, animesDebounceSearch]);

    const animesItems: AnimeItemViewModel[] = animes.map(a => ({
        id: a.id,
        name: a.name,
        active: a.active,
        image: `/assets/images/animes/${a.id}/symbol.jpg`
    }))

    const charactersItems: CharacterItemViewModel[] = characters.map(a => ({
        id: a.id,
        anime_id: a.anime_id,
        name: a.name,
        active: a.active,
        image: `/assets/images/cards/${a.id}/thumbnail/1/thumbnail.jpg`
    }))

    const animesList = animesItems.map((a) => ({value: a.id, label: a.name}))

    const getCharacter = async (id: number) => {
        const res = await Request.get(`/characters/${id}`);

        if(!res.ok) {
            if(res.status === 404) {
                showMessageModal({
                    type: "error",
                    description: res.data.message
                });
            };
        };

        return res.data;
    };

    const openEditModal = async () => {
        if(selectedCharacters.length <= 0) {
            showMessageModal({
                type: "warning",
                description: "É preciso selecionar um personagem para executar está ação.",
            });
            
            return;
        }

        if(selectedCharacters.length > 1) {
            showMessageModal({
                type: "warning",
                description: "Não é possível executar está ação com mais de um personagem selecionado."
            });

            return;
        }

        const character = await getCharacter(selectedCharacters[0]);

        setEditModalCharacter(character);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <>
            <div className={`${styles["content-container"]} ${styles["animes"]}`}>
                <span className={`container-title`}>Lista de Animes</span>
                <div className={`${styles["content-list-search-filters"]}`}>
                    <input 
                        className={`field-default ${styles["content-list-search-input"]}`} 
                        type="text" 
                        placeholder="Pesquisar anime"
                        value={animesSearch}
                        onChange={(e) => {
                            setAnimesSearch(e.target.value);
                            setAnimesPage(1);
                        } }    
                    />
                    <div className={`${styles["content-list-filters"]}`}>
                        <span className={`item-default item-select`}>Filtrar</span>
                    </div>
                </div>
                <div className={`${styles["content-list-container"]}`}>
                    <ContentOptions type={"anime"} open={openEditModal} />
                    <div className={`container-default ${styles["list-content"]} ${animes.length > 0 ? styles["anime"] : styles["no-results"]}`}>
                        <div className={`${styles["content-list-item"]}`} >
                            <NavLink to={`${BASE_DASHBOARD_CONTENT_URL}/animes/creation`}>
                                <div className={`${styles["content-option-item"]} ${styles["anime"]}`}>
                                    <PlusOutlined style={{fontSize: "30px"}}/>
                                </div>
                            </NavLink>
                        </div>
                        {animesItems.length > 0 
                            ? animesItems.map((anime) => (
                                <>
                                    <ContentItemComponent 
                                        key={anime.id} 
                                        item={anime} 
                                        selected={selectedAnimes} 
                                        onToggle={() => toggleId(anime.id, setSelectedAnimes)}
                                    />
                                </>
                            ))
                            : (
                                <>
                                    <span style={{textAlign: "center", fontWeight: "bold"}}>Nenhum anime encontrado</span>
                                    {animesSearch && <span style={{textAlign: "center"}}>({animesSearch})</span>}
                                </>
                            )
                        }
                    </div>
                    {animes.length > 0 && (
                        <DashboardPagination style={{alignSelf: "center", justifySelf: "flex-end"}} page={animesPage} totalPages={totalAnimesPage} onPageChange={setAnimesPage} range={{start: 3, end: 2}} />
                    )}
                </div>
            </div>
            <div className={`${styles["content-container"]} ${styles["characters"]}`}>
                <span className={`container-title`}>Lista de Personagens</span>
                <div className={`${styles["content-list-search-filters"]}`}>
                    <input 
                        className={`field-default ${styles["content-list-search-input"]}`} 
                        type="text" 
                        placeholder="Pesquisar personagem"
                        value={charactersSearch}
                        onChange={(e) => {
                            setCharactersSearch(e.target.value);
                            setCharactersPage(1);
                        } }    
                    />
                    <div className={`${styles["content-list-filters"]}`}>
                        <span className={`item-default item-select`}>Filtrar</span>
                    </div>
                </div>
                <div className={`${styles["content-list-container"]}`}>
                    <ContentOptions open={openEditModal} type={"character"} />
                    <div className={`container-default ${styles["list-content"]} ${characters.length > 0 ? styles["character"] : styles["no-results"]}`}>
                        <NavLink to={`${BASE_DASHBOARD_CONTENT_URL}/characters/create`}>
                            <div className={`${styles["content-option-item"]} ${styles["character-thumbnail"]}`}>
                                <PlusOutlined style={{fontSize: "40px"}}/>
                            </div>
                        </NavLink>
                        {charactersItems.length > 0 
                            ? charactersItems.map((character) => (
                                    <ContentItemComponent 
                                        key={character.id} 
                                        item={character} 
                                        selected={selectedCharacters} 
                                        onToggle={() => toggleId(character.id, setSelectedCharacters)} 
                                    />
                            ))
                            : (
                                <>
                                    <span style={{textAlign: "center", fontWeight: "bold"}}>Nenhum personagem encontrado</span>
                                    {charactersSearch && <span style={{textAlign: "center"}}>({charactersSearch})</span>}
                                </>
                            )
                        }
                    </div>
                    {characters.length > 0 && (
                        <DashboardPagination style={{alignSelf: "center", justifySelf: "flex-end"}} page={charactersPage} totalPages={totalCharactersPage} onPageChange={setCharactersPage} range={{start: 3, end: 2}} />
                    )}
                    {editModalCharacter && (
                        <CharacterEditModal open={isEditModalOpen} onClose={closeEditModal} character={editModalCharacter} animesList={animesList} toggleBoolean={toggleBoolean}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default ContentMain;