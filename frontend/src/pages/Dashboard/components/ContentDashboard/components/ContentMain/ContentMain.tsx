import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import SelectableContentItem from "@/pages/Dashboard/components/ContentDashboard/SelectableContentItem";
import DashboardPagination from "@/pages/Dashboard/shared/DashboardPagination";
import ContentOptions from "@/pages/Dashboard/components/ContentDashboard/ContentOptions";
import AnimeCreationModal from "./components/AnimeCreationModals/AnimeCreationModal";
import AnimeEditModal from "./components/AnimeCreationModals/AnimeEditModal";
import CharacterEditModal from "./components/CharacterCreationModals/CharacterEditModal";
import CharacterSoftDeleteModal from "./components/CharacterCreationModals/CharacterSoftDeleteModal";
import CharacterRestoreModal from "./components/CharacterCreationModals/CharacterRestoreModal";
import AnimeSoftDeleteModal from "./components/AnimeCreationModals/AnimeSoftDeleteModal";
import { toggleId, toggleBoolean } from "@/utils/toggle";
import { PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Request } from "@/services/apiClient";
import { useMessageModal } from "@/contexts/UIFeedbackContext";
import type { AnimeRestore, AnimeDelete, AnimeEdit, AnimeItem, CharacterDelete, CharacterEdit, CharacterItem, CharacterRestore } from "@/pages/Dashboard/components/ContentDashboard/types/content.types";
import AnimeRestoreModal from "./components/AnimeCreationModals/AnimeRestoreModal";

export const BASE_ATTRIBUTES_URL = "/assets/images/icons/attributes";

export type ContentImageCacheKey = `character:${number}` | `anime:${number}`

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

    const [animesList, setAnimesList] = useState<AnimeItem[]>([]);

    const [charactersDebounceSearch, setCharactersDebounceSearch] = useState("");
    const [animesDebounceSearch, setAnimeDebounceSearch] = useState("");

    const [selectedAnimes, setSelectedAnimes] = useState<number[]>([]);
    const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

    const [isCreateAnimeModalOpen, setIsCreateAnimeModalOpen] = useState(false);
    const [isEditAnimeModalOpen, setIsEditAnimeModalOpen] = useState(false);
    const [editModalAnime, setEditModalAnime] = useState<AnimeEdit | null>(null);

    const [isEditCharacterModalOpen, setIsEditCharacterModalOpen] = useState(false);
    const [editModalCharacter, setEditModalCharacter] = useState<CharacterEdit | null>(null);

    const [isDeleteAnimeModalOpen, setIsDeleteAnimeModalOpen] = useState(false);
    const [deleteModalAnimes, setDeleteModalAnimes] = useState<AnimeDelete[] | null>(null);
    const [isDeleteCharacterModalOpen, setIsDeleteCharacterModalOpen] = useState(false);
    const [deleteModalCharacters, setDeleteModalCharacters] = useState<CharacterDelete[] | null>(null);

    const [isRestoreAnimeModalOpen, setIsRestoreAnimeModalOpen] = useState(false);
    const [restoreModalAnimes, setRestoreModalAnimes] = useState<AnimeRestore[] | null>(null);    
    const [isRestoreCharacterModalOpen, setIsRestoreCharacterModalOpen] = useState(false);
    const [restoreModalCharacters, setRestoreModalCharacters] = useState<CharacterRestore[] | null>(null);

    const [animesRefreshKey, setAnimesRefreshKey] = useState(0);
    const [charactersRefreshKey, setCharactersRefreshKey] = useState(0);
    const [imageCacheVersions, setImageCacheVersions] = useState<Record<string, number>>({})

    const { user } = useAuth();

    if(!user)
        return null;

    useEffect(() => {
        getAllAnimes();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCharactersDebounceSearch(charactersSearch);

        }, 500);

        return () => clearTimeout(timer);
    }, [charactersSearch]);

    useEffect(() => {
        getCharacters();

    }, [charactersPage, charactersDebounceSearch, charactersRefreshKey]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimeDebounceSearch(animesSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [animesSearch]);

    useEffect(() => {
        getAnimes();
        getCharacters();

    }, [animesPage, animesDebounceSearch, animesRefreshKey]);

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
            setSelectedCharacters([]);

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

    const getAllAnimes = async () => {
        const res = await Request.get("/animes", {
            query: {
                deleted: "not_deleted"
            }
        });

        if(!res.ok) {
            return;
        };

        setAnimesList(res.data.data);
    };

    const getAnime = async (id: number) => {
        const res = await Request.get(`/animes/${id}`);

        if(!res.ok) {
            if(res.status === 404) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    }
                });
            };
        };

        return res.data;
    };

    const getCharacter = async (id: number) => {
        const res = await Request.get(`/characters/${id}`);

        if(!res.ok) {
            if(res.status === 404) {
                showMessageModal({
                    data: {
                        type: "error",
                        description: res.data.message
                    }
                });
            };
        };

        return res.data;
    };

    const openEditAnimeModal = async () => {
        if(selectedAnimes.length <= 0) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "É preciso selecionar pelo menos um anime para executar está ação.",
                }
            });
            
            return;
        };

        if(selectedAnimes.length > 1) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "Não é possível executar está ação com mais de um anime selecionado."
                }
            });

            return;
        };

        const anime = await getAnime(selectedAnimes[0]);

        setEditModalAnime(anime);
        setIsEditAnimeModalOpen(true);
    };

    const openDeleteAnimeModal = async () => {
        if(selectedAnimes.length <= 0) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "É preciso selecionar pelo menos um personagem para executar está ação.",
                }
            });
            
            return;
        };

        if(selectedAnimes.length > 5) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "Não é possível excluir mais do que 5 personagens ao mesmo tempo."
                }
            });

            return;
        };

        const selected = animes
            .filter((a) => selectedAnimes.includes(a.id))
            .map((a) => ({
                id: a.id,
                name: a.name    
            }));

        setDeleteModalAnimes(selected);
        setIsDeleteAnimeModalOpen(true);
    };

    const openRestoreAnimeModal = async () => {
        if(selectedAnimes.length <= 0) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "É preciso selecionar pelo menos um personagem para executar está ação.",
                }
            });
            
            return;
        };

        if(selectedAnimes.length > 5) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "Não é possível excluir mais do que 5 personagens ao mesmo tempo."
                }
            });

            return;
        };

        const selected = animes
            .filter((a) => selectedAnimes.includes(a.id))
            .map((a) => ({
                id: a.id,
                name: a.name    
            }));

        setRestoreModalAnimes(selected);
        setIsRestoreAnimeModalOpen(true);
    };

    const openEditCharacterModal = async () => {
        if(selectedCharacters.length <= 0) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "É preciso selecionar pelo menos um personagem para executar está ação.",
                }
            });
            
            return;
        };

        if(selectedCharacters.length > 1) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "Não é possível executar está ação com mais de um personagem selecionado."
                }
            });

            return;
        };

        const character = await getCharacter(selectedCharacters[0]);

        setEditModalCharacter(character);
        setIsEditCharacterModalOpen(true);
    };

    const openDeleteCharacterModal = async () => {
        if(selectedCharacters.length <= 0) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "É preciso selecionar pelo menos um personagem para executar está ação.",
                }
            });
            
            return;
        };

        if(selectedCharacters.length > 5) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "Não é possível excluir mais do que 5 personagens ao mesmo tempo."
                }
            });

            return;
        };

        const selected = characters
            .filter((c) => selectedCharacters.includes(c.id))
            .map((c) => ({
                id: c.id,
                name: c.name    
            }));

        setDeleteModalCharacters(selected);
        setIsDeleteCharacterModalOpen(true);
    };

    const openRestoreCharacterModal = async () => {
        if(selectedCharacters.length <= 0) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "É preciso selecionar pelo menos um personagem para executar está ação.",
                }
            });
            
            return;
        };

        if(selectedCharacters.length > 5) {
            showMessageModal({
                data: {
                    type: "warning",
                    description: "Não é possível excluir mais do que 5 personagens ao mesmo tempo."
                }
            });

            return;
        };

        const selected = characters
            .filter((c) => selectedCharacters.includes(c.id))
            .map((c) => ({
                id: c.id,
                name: c.name    
            }));

        setRestoreModalCharacters(selected);
        setIsRestoreCharacterModalOpen(true);
    };

    const closeCreateAnimeModal = () => {
        setIsCreateAnimeModalOpen(false);
    };

    const closeEditAnimeModal = () => {
        setIsEditAnimeModalOpen(false);
    };

    const closeDeleteAnimeModal = () => {
        setDeleteModalAnimes(null);
        setIsDeleteAnimeModalOpen(false);
    };

    const closeRestoreAnimeModal = () => {
        setRestoreModalAnimes(null);
        setIsRestoreAnimeModalOpen(false);
    };

    const closeEditCharacterModal = () => {
        setIsEditCharacterModalOpen(false);
    };

    const closeDeleteCharacterModal = () => {
        setDeleteModalCharacters(null);
        setIsDeleteCharacterModalOpen(false);
    };

    const closeRestoreCharacterModal = () => {
        setRestoreModalCharacters(null);
        setIsRestoreCharacterModalOpen(false);
    };

    const handleImagesChanged = (key: ContentImageCacheKey) => {
        setImageCacheVersions((current) => ({
            ...current,
            [key]: (current[key] ?? 0) + 1
        }));
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
                    <ContentOptions openEdit={openEditAnimeModal} openDelete={openDeleteAnimeModal} openRestore={openRestoreAnimeModal}/>
                    <div className={`container-default ${styles["list-content"]} ${animes.length > 0 ? styles["anime"] : styles["no-results"]}`}>
                        <div className={`${styles["content-list-item"]}`} >
                            <div className={`${styles["content-option-item"]} ${styles["anime"]}`} onClick={() => setIsCreateAnimeModalOpen(true)}>
                                <PlusOutlined style={{fontSize: "30px"}}/>
                            </div>
                        </div>
                        {animes.length > 0 
                            ? animes.map((a) => {
                                const imageCacheVersion = imageCacheVersions[`anime:${a.id}`];
                                const imageCacheQuery = imageCacheVersion !== undefined
                                    ? `?v=${imageCacheVersion}`
                                    : "";

                                return (
                                    <SelectableContentItem 
                                        key={a.id} 
                                        item={{
                                            id: a.id,
                                            name: a.name,
                                            active: a.active,
                                            deleted_at: a.deleted_at
                                        }} 
                                        selected={selectedAnimes} 
                                        onToggle={() => toggleId(a.id, setSelectedAnimes)}
                                        type={"anime"}
                                        imageVersion={imageCacheQuery}
                                    />
                                )
                            })
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
                        }}    
                    />
                    <div className={`${styles["content-list-filters"]}`}>
                        <span className={`item-default item-select`}>Filtrar</span>
                    </div>
                </div>
                <div className={`${styles["content-list-container"]}`}>
                    <ContentOptions openEdit={openEditCharacterModal} openDelete={openDeleteCharacterModal} openRestore={openRestoreCharacterModal} />
                    <div className={`container-default ${styles["list-content"]} ${characters.length > 0 ? styles["character"] : styles["no-results"]}`}>
                        <NavLink style={{display: "flex", justifyContent: "center", alignItems: "flex-end"}} to={`${BASE_DASHBOARD_CONTENT_URL}/characters/create`}>
                            <div className={`${styles["content-option-item"]} ${styles["character"]}`}>
                                <PlusOutlined style={{fontSize: "40px"}}/>
                            </div>
                        </NavLink>
                        {characters.length > 0
                            ? characters.map((c) => {
                                const imageCacheVersion = imageCacheVersions[`character:${c.id}`];
                                const imageCacheQuery = imageCacheVersion !== undefined
                                    ? `?v=${imageCacheVersion}`
                                    : "";

                                return (                                    
                                    <SelectableContentItem 
                                        key={c.id} 
                                        item={c} 
                                        selected={selectedCharacters} 
                                        onToggle={() => toggleId(c.id, setSelectedCharacters)}
                                        type={"character"}
                                        imageVersion={imageCacheQuery}
                                    />
                                )
                            })
                            :   (                              
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
                    <AnimeCreationModal 
                        open={isCreateAnimeModalOpen}
                        onClose={closeCreateAnimeModal}
                        hide={() => { setIsCreateAnimeModalOpen(false)}}
                        reopen={() => { setIsCreateAnimeModalOpen(true)}}
                        onSuccessCallback={() => { setAnimesRefreshKey((current) => current + 1)}}
                    />
                    {editModalAnime && (
                        <AnimeEditModal 
                            open={isEditAnimeModalOpen}
                            onClose={closeEditAnimeModal}
                            hide={() => setIsEditAnimeModalOpen(false)}
                            reopen={() => setIsEditAnimeModalOpen(true)}
                            anime={editModalAnime}
                            imageCacheVersion={imageCacheVersions[`anime:${editModalAnime.id}`] ?? null}
                            onChangeImage={handleImagesChanged}
                            onSuccessCallback={() => setAnimesRefreshKey((current) =>  current + 1)}
                        />
                    )}
                    <AnimeSoftDeleteModal 
                        open={isDeleteAnimeModalOpen}
                        onClose={closeDeleteAnimeModal}
                        hide={() => setIsDeleteAnimeModalOpen(false)}
                        reopen={() => setIsDeleteAnimeModalOpen(true)}
                        onSuccessCallback={() => setAnimesRefreshKey((current) => current + 1)}
                        selectedAnimes={deleteModalAnimes}
                    />
                    <AnimeRestoreModal 
                        open={isRestoreAnimeModalOpen}
                        onClose={closeRestoreAnimeModal}
                        hide={() => setIsRestoreAnimeModalOpen(false)}
                        reopen={() => setIsEditAnimeModalOpen(true)}
                        onSuccessCallback={() => setAnimesRefreshKey((current) => current + 1)}
                        selectedAnimes={restoreModalAnimes}
                    />
                    {editModalCharacter && (
                        <CharacterEditModal 
                            open={isEditCharacterModalOpen} 
                            onClose={closeEditCharacterModal} 
                            character={editModalCharacter} 
                            animesList={animesList.map((a) => ({value: a.id, label: a.name}))} 
                            toggleBoolean={toggleBoolean} 
                            imageCacheVersion={imageCacheVersions[`character:${editModalCharacter.id}`] ?? null} 
                            onChangeImage={handleImagesChanged} 
                            onSuccessCallback={() => {setCharactersRefreshKey((current) => current + 1);}} 
                        />
                    )}
                    <CharacterSoftDeleteModal 
                        open={isDeleteCharacterModalOpen} 
                        onClose={closeDeleteCharacterModal} 
                        hide={() => setIsDeleteCharacterModalOpen(false)} 
                        reopen={() => setIsDeleteCharacterModalOpen(true)} 
                        onSuccessCallback={() => {setCharactersRefreshKey((current) => current + 1);}}
                        selectedCharacters={deleteModalCharacters} 
                    />
                    <CharacterRestoreModal 
                        open={isRestoreCharacterModalOpen} 
                        onClose={closeRestoreCharacterModal} 
                        hide={() => setIsRestoreCharacterModalOpen(false)} 
                        reopen={() => setIsRestoreCharacterModalOpen(true)} 
                        onSuccessCallback={() => {setCharactersRefreshKey((current) => current + 1);}} 
                        selectedCharacters={restoreModalCharacters}  
                    />
                </div>
            </div>
        </>
    )
}

export default ContentMain;