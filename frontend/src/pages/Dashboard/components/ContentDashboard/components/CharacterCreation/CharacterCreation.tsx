import styles from "@/pages/Dashboard/Dashboard.module.css";
import { Request } from "@/services/apiClient";
import { DownOutlined, StopOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { AnimeItem, AnimeItemViewModel } from "../../types/content.types";
import ContentItemComponent from "../../ContentItem";
import DashboardPagination from "@/pages/Dashboard/shared/DashboardPagination";
import { Button, Input } from "antd";

const CharacterCreation = () => {
    const [animeFormToggle, setAnimeFormToggle] = useState(true);
    const [characterFormToggle, setCharacterFormToggle] = useState(false);

    const [animes, setAnimes] = useState<AnimeItem[]>([]);
    const [animesSearch, setAnimesSearch] = useState("");
    const [animesPages, setAnimesPages] = useState(1);
    const [totalAnimesPages, setTotalAnimesPages] = useState(1);

    const [animesDebounceSearch, setAnimesDebounceSearch] = useState("");
    
    const [confirmedAnime, setConfirmedAnime] = useState<number[]>([]);
    const [selectedAnime, setSelectedAnime] = useState<number[]>([]);

    const loadAnimes = async () => {
        try {
            const response = await Request.get("/animes", {
                query: {
                    page: animesPages,
                    search: animesSearch
                }
            });

            setAnimes(response.data.data);
            setTotalAnimesPages(response.data.meta.totalPages);
            setSelectedAnime([]);
        } catch(err) {
            setAnimes([]);
            setSelectedAnime([]);
        }
    }

    const selectAnime = (id: number, setState: React.Dispatch<React.SetStateAction<number[]>>) => {
        setState(prev => 
            prev.includes(id)
                ? []
                : [id]
        );
    }

    useEffect(() => {
        loadAnimes();

    }, [animesPages, animesDebounceSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimesDebounceSearch(animesSearch);

        }, 500);

        return () => clearTimeout(timer);
    }, [animesSearch]);

    const toggleAnimeForm = () => {
        setAnimeFormToggle(prev => !prev);
        setAnimesSearch("");
    }

    const toggleCharacterForm = () => {
        setCharacterFormToggle(prev => !prev);
    }

    const handleConfirmAnime = () => {
        if(confirmedAnime.includes(selectedAnime[0]))
            return {message: "Anime já está selecionado", type: "error"};

        setConfirmedAnime(selectedAnime);
        setAnimeFormToggle(false);
        setCharacterFormToggle(true);

        setSelectedAnime([]);
    }

    const animesItems: AnimeItemViewModel[] = animes.map(a => ({
        id: a.id,
        name: a.name,
        active: a.active,
        image: `/assets/images/animes/${a.id}/symbol.jpg`
    }))

    return (
        <>
            <div className={`${styles["character-creation-container"]}`}>
                <div className={`${styles["character-preview-info"]}`}>

                </div>
                <div className={`${styles["content-form-default"]} anime-selection-form`}>
                    <div className={`${styles["content-form-top-container"]}`} >
                        <span className={`container-title ${styles["form-title"]}`}>Selecione o Anime</span>
                        {animeFormToggle 
                            ? (<UpOutlined style={{fontSize: "20px", paddingRight: "10px", cursor: "pointer"}} onClick={() => toggleAnimeForm()}/>) 
                            : (<DownOutlined style={{fontSize: "20px", paddingRight: "10px", cursor: "pointer"}} onClick={() => toggleAnimeForm()}/>)
                        }
                    </div>
                    <div className={`${styles["content-form-content"]} ${animeFormToggle ? styles["open"] : ""}`} >
                        <div className={`container-default ${styles["list-content"]} ${animes.length > 0 ? styles["anime"] : styles["no-results"]}`}>
                            {animesItems.length > 0 
                                ? animesItems.map((anime) => (
                                    <>
                                        <ContentItemComponent 
                                            key={anime.id} 
                                            item={anime} 
                                            selected={selectedAnime} 
                                            onToggle={() => selectAnime(anime.id, setSelectedAnime)}
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
                        <div className={`${styles["anime-select-options"]}`}>
                            <Input 
                                className={`field-default ${styles["content-list-search-input"]} ${styles["form-search"]} ${!animeFormToggle ? "field-default-disabled" : ""}`}                         
                                placeholder="Pesquisar anime"
                                value={animesSearch}
                                onChange={(e) => {
                                    setAnimesSearch(e.target.value);
                                    setAnimesPages(1);
                                }}
                                disabled={!animeFormToggle}
                            />
                            <Button type="primary" className={`btn-default primary-btn`} disabled={!animeFormToggle || !selectedAnime.length || confirmedAnime.includes(selectedAnime[0])} onClick={handleConfirmAnime}>
                                Confirmar
                            </Button>
                        </div>
                        {animes.length > 0 && (
                            <DashboardPagination style={{alignSelf: "center", justifySelf: "flex-end"}} page={animesPages} totalPages={totalAnimesPages} onPageChange={setAnimesPages} range={{start: 3, end: 2}} />
                        )}
                    </div>
                </div>
                <div className={`${styles["content-form-default"]} character-info-form `}>
                    <div className={`${styles["content-form-top-container"]}`}>
                        <span className={`container-title ${styles["form-title"]}`}>Informações do Personagem</span>
                        {confirmedAnime.length > 0 
                            ? (characterFormToggle 
                                ? (<UpOutlined style={{fontSize: "20px", paddingRight: "10px", cursor: "pointer"}} onClick={() => toggleCharacterForm()}/>) 
                                : (<DownOutlined style={{fontSize: "20px", paddingRight: "10px", cursor: "pointer"}} onClick={() => toggleCharacterForm()}/>)
                            )
                            : (<StopOutlined style={{fontSize: "20px", paddingRight: "10px"}}/>)
                        }
                    </div>
                    <div className={`${styles["content-form-content"]} ${characterFormToggle ? styles["open"] : ""}`} >
                        {/* {characterFormToggle 
                            ? (<UpOutlined style={{fontSize: "20px", paddingRight: "10px", cursor: "pointer"}} onClick={() => setCharacterFormToggle(false)}/>) 
                            : (<DownOutlined style={{fontSize: "20px", paddingRight: "10px", cursor: "pointer"}} onClick={() => setCharacterFormToggle(true)}/>)
                        } */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterCreation;