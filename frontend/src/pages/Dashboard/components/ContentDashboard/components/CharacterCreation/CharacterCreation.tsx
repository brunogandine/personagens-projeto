import styles from "@/pages/Dashboard/Dashboard.module.css";
import { Request } from "@/services/apiClient";
import { DownOutlined, StopOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { AnimeItem, AnimeItemViewModel } from "../../types/content.types";
import ContentItemComponent from "../../ContentItem";
import DashboardPagination from "@/pages/Dashboard/shared/DashboardPagination";
import { Button, Input, InputNumber } from "antd";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";

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

    const [activeCharacter, setActiveCharacter] = useState(false);
    const [currencyLockCharacter, setCurrencyLockCharacter] = useState(false);

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

            if(selectedAnime.length > 0 && confirmedAnime.length > 0) {
                setSelectedAnime(confirmedAnime);

                return;
            }

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
                <div className={`content-container ${styles["character-create-content"]}`}>
                    <div className={`${styles["content-form-top-container"]}`} >
                        <span className={`container-title ${styles["form-title"]}`}>Selecione o Anime</span>
                        {animeFormToggle 
                            ? (<UpOutlined style={{fontSize: "20px", cursor: "pointer"}} onClick={() => toggleAnimeForm()}/>) 
                            : (<DownOutlined style={{fontSize: "20px", cursor: "pointer"}} onClick={() => toggleAnimeForm()}/>)
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
                        <div className={`${styles["content-selection-options"]}`}>
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
                <div className={`content-container ${styles["character-create-content"]}`}>
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
                        <form className={`${styles["character-form"]}`}>
                            <fieldset className={`${styles["basic-info-fieldset"]}`} >
                                <legend className={`item-default`} style={{fontSize: "18px"}}>Básico</legend>
                                <div className={`${styles["basic-info-fields"]}`}>
                                    <label htmlFor="character-name" className={`input-label-default`}>Nome do Personagem *</label>
                                    <Input className={`field-default`} id="character-name" name="character-name" />
                                    <label htmlFor="character-description" className={`input-label-default`} >Descrição do Personagem</label>
                                    <textarea id="character-description" className={`input-text-default`} name="character-description" rows={4}></textarea>
                                </div>
                            </fieldset>
                            <fieldset className={`${styles["attributes-fieldset"]}`}>
                                <legend className={`item-default`} style={{fontSize: "18px"}}>Atributos</legend>
                                <div className={`${styles["stat-field"]}`}>
                                    <label htmlFor="attack" className={`input-label-default`} >Ataque</label>
                                    <InputNumber className={`field-default input-default`} id="attack" name="attack" min={0} />
                                </div>
                                <div className={`${styles["stat-field"]}`}>
                                    <label htmlFor="defense" className={`input-label-default`} >Defesa</label>
                                    <InputNumber className={`field-default input-default`} id="defense" name="defense" min={0} />
                                </div>
                                <div className={`${styles["stat-field"]}`}>
                                    <label htmlFor="health" className={`input-label-default`} >Vida</label>
                                    <InputNumber className={`field-default input-default`} id="health" name="health" min={0} />
                                </div>
                            </fieldset>
                            <fieldset className={`${styles["settings-fieldset"]}`}>
                                <legend className={`item-default`} style={{fontSize: "18px"}}>Configurações</legend>
                                <label htmlFor="character-active">Ativo</label>
                                <CheckboxComponent checked={activeCharacter} onToggle={() => setActiveCharacter(!activeCharacter)} />
                                <label htmlFor="character-currency-lock">Personagem Bloqueado</label>
                                <CheckboxComponent checked={currencyLockCharacter} onToggle={() => setCurrencyLockCharacter(!currencyLockCharacter)} />
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterCreation;