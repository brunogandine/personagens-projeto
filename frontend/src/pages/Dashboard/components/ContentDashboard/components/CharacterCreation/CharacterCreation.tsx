import styles from "@/pages/Dashboard/Dashboard.module.css";
import { Request } from "@/services/apiClient";
import { DownOutlined, UploadOutlined, StopOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import type { AnimeItem, AnimeItemViewModel } from "../../types/content.types";
import ContentItemComponent from "../../ContentItem";
import DashboardPagination from "@/pages/Dashboard/shared/DashboardPagination";
import { Button, Input, InputNumber, Tooltip } from "antd";
import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import { validateImageFile } from "@/helpers/validateImageFile";
import ImageCropModal from "./components/ImageCropModal";

const BASE_ATTRIBUTES_URL = "/assets/images/icons/attributes";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const CharacterCreation = () => {
    const [animeFormToggle, setAnimeFormToggle] = useState(true);
    const [characterFormToggle, setCharacterFormToggle] = useState(false);
    const [characterArtworkFormToggle, setCharacterArtworkFormToggle] = useState(false);

    const [animes, setAnimes] = useState<AnimeItem[]>([]);
    const [animesSearch, setAnimesSearch] = useState("");
    const [animesPages, setAnimesPages] = useState(1);
    const [totalAnimesPages, setTotalAnimesPages] = useState(1);

    const [animesDebounceSearch, setAnimesDebounceSearch] = useState("");
    
    const [confirmedAnime, setConfirmedAnime] = useState<AnimeItemViewModel | null>(null);
    const [selectedAnime, setSelectedAnime] = useState<number[]>([]);

    const [characterName, setCharacterName] = useState("");
    const [characterDescription, setCharacterDescription] = useState("");
    const [characterAttack, setCharacterAttack] = useState(5);
    const [characterDefense, setCharacterDefense] = useState(5);
    const [characterHealth, setCharacterHealth] = useState(100);
    const [activeCharacter, setActiveCharacter] = useState(false);
    const [currencyLockCharacter, setCurrencyLockCharacter] = useState(false);

    const [smallArtworkPreview, setSmallArtworkPreview] = useState<string | null>(null);
    const [smallArtworkBlob, setSmallArtworkBlob] = useState<Blob | null>(null);
    const [selectedSmallArtwork, setSelectedSmallArtwork] = useState<string | null>(null);

    const [isCropModalOpen, setIsCropModalOpen] = useState(false);

    const canSubmit = confirmedAnime && characterName && smallArtworkBlob;

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

            if(selectedAnime.length > 0 && confirmedAnime) {
                setSelectedAnime([confirmedAnime.id]);

                return;
            };

            setSelectedAnime([]);
        } catch(err) {
            setAnimes([]);
            setSelectedAnime([]);
        }
    };

    const selectAnime = (id: number, setState: React.Dispatch<React.SetStateAction<number[]>>) => {
        setState(prev => 
            prev.includes(id)
                ? []
                : [id]
        );
    };

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
    };

    const toggleCharacterForm = () => {
        setCharacterFormToggle(prev => !prev);
    };

    const handleConfirmAnime = () => {
        if(confirmedAnime?.id === selectedAnime[0])
            return {message: "Anime já está selecionado", type: "error"};

        const anime = animesItems.find(a => a.id === selectedAnime[0]);

        if(!anime)
            return {message: "Anime não encontrado", type: "error"};

        setConfirmedAnime(anime);
        setAnimeFormToggle(false);
        setCharacterFormToggle(true);
    };

    const animesItems: AnimeItemViewModel[] = animes.map(a => ({
        id: a.id,
        name: a.name,
        active: a.active,
        image: `/assets/images/animes/${a.id}/symbol.jpg`
    }));

    const uploadSmallArtwork = () => {
        fileInputRef.current?.click();
    };

    const handleSmallArtwork = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file)
            return;

        if(!ALLOWED_TYPES.includes(file.type)) {
            alert("Tipo de arquivo inválido.");
            e.target.value = "";

            return;
        };

        if(file.size > MAX_FILE_SIZE) {
            alert("Arquivo muito grande. O tamanho máximo permitido é 5MB.");
            e.target.value = "";

            return;
        };

        const isValidImg = validateImageFile(file);

        if(!isValidImg) {
            alert("O arquivo enviado não é uma imagem válida.");
            e.target.value = "";

            return;
        };

        const imageUrl = URL.createObjectURL(file);

        setIsCropModalOpen(true);
        setSelectedSmallArtwork(imageUrl);

        e.target.value = "";
    };

    const handleSmallArtworkCropClose = () => {
        setIsCropModalOpen(false);

        selectedSmallArtwork && URL.revokeObjectURL(selectedSmallArtwork);

        setSelectedSmallArtwork(null);
    };

    const handleCropApply = (blob: Blob) => {
        if(smallArtworkPreview)
            URL.revokeObjectURL(smallArtworkPreview);

        const imageUrl = URL.createObjectURL(blob);

        setSmallArtworkPreview(imageUrl);
        setSmallArtworkBlob(blob);

        if(selectedSmallArtwork)
            URL.revokeObjectURL(selectedSmallArtwork);

        setSelectedSmallArtwork(null);
        setIsCropModalOpen(false);
    };

    const handleRemoveSmallArtwork = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();

        if(smallArtworkPreview)
            URL.revokeObjectURL(smallArtworkPreview);

        setSmallArtworkPreview(null);
        setSmallArtworkBlob(null);

        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <>
            <div className={`${styles["character-creation-form-controls"]}`} >
                <Button type="primary" className="btn-default primary-btn" disabled={!canSubmit} >Confirmar Personagem</Button>
                <Button type="primary" className="btn-default danger-btn" >Resetar Formulário</Button>
            </div>
            <div className={`${styles["character-creation-container"]}`}>
                <div className={`${styles["character-creation-form"]} scrollbar-default`}>
                    <div className={`content-container ${styles["character-create-content"]} ${confirmedAnime ? styles["success-container"] : ""}`}>
                        <div className={`${styles["content-form-top-container"]}`} >
                            <span className={`container-title`}>Selecione o Anime</span>
                            <div className={`${styles["content-form-top-divider"]}`}>{confirmedAnime ? confirmedAnime.name : ""}</div>
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
                                <Button type="primary" className={`btn-default primary-btn`} disabled={!animeFormToggle || !selectedAnime.length || confirmedAnime?.id === selectedAnime[0]} onClick={handleConfirmAnime}>
                                    Confirmar
                                </Button>
                            </div>
                            {animes.length > 0 && (
                                <DashboardPagination style={{alignSelf: "center", justifySelf: "flex-end"}} page={animesPages} totalPages={totalAnimesPages} onPageChange={setAnimesPages} range={{start: 3, end: 2}} />
                            )}
                        </div>
                    </div>
                    <div className={`content-container ${styles["character-create-content"]} ${characterName && smallArtworkBlob ? styles["success-container"] : ""}`}>
                        <div className={`${styles["content-form-top-container"]}`}>
                            <span className={`container-title`}>Informações do Personagem</span>
                            <div className={`${styles["content-form-top-divider"]}`}>
                                <Tooltip
                                    title={                                            
                                        <>
                                            <div className={`${styles["character-info-tooltip"]}`}>
                                                <span>Anime: <span style={{color: "var(--yellow-800)"}}>{confirmedAnime?.name}</span></span>
                                                <span>Nome do Personagem: <span style={{color: "var(--yellow-800)"}}>{characterName}</span></span>
                                                <span>Ataque: <span style={{color: "var(--yellow-800)"}}>{characterAttack}</span></span>
                                                <span>Defesa: <span style={{color: "var(--yellow-800)"}}>{characterDefense}</span></span>
                                                <span>Vida: <span style={{color: "var(--yellow-800)"}}>{characterHealth}</span></span>
                                                <span>Personagem {activeCharacter ? (<span style={{color: "var(--yellow-800)"}}>Ativo</span>) : (<span style={{color: "var(--red-300)"}}>Inativo</span>)}</span>
                                                <span>Personagem {currencyLockCharacter ? (<span style={{color: "var(--red-300)"}}>Bloqueado</span>) : (<span style={{color: "var(--yellow-800)"}}>Desbloqueado</span>)}</span>
                                                {smallArtworkPreview && (
                                                    <img src={smallArtworkPreview} />
                                                )}
                                            </div>
                                        </>
                                    }
                                    overlayStyle={{maxWidth: "450px", whiteSpace: "normal"}}
                                >
                                    {characterName}
                                </Tooltip>
                            </div>
                            {confirmedAnime 
                                ? (characterFormToggle 
                                    ? (<UpOutlined style={{fontSize: "20px", cursor: "pointer"}} onClick={() => toggleCharacterForm()}/>) 
                                    : (<DownOutlined style={{fontSize: "20px", cursor: "pointer"}} onClick={() => toggleCharacterForm()}/>)
                                )
                                : (<StopOutlined style={{fontSize: "20px", paddingRight: "10px"}}/>)
                            }
                        </div>
                        <div className={`${styles["content-form-content"]} ${characterFormToggle ? styles["open"] : ""}`} >
                            <form className={`${styles["character-form"]}`}>
                                <fieldset className={`${styles["basic-info-fieldset"]}`} >
                                    <legend className={`item-default`} style={{fontSize: "18px"}}>Básico</legend>
                                    <div className={`${styles["basic-info-fields"]}`}>
                                        <label htmlFor="character-name" className={`input-label-default`}>Nome do Personagem <span style={{color: "var(--red-300)"}}>*</span></label>
                                        <Input className={`field-default`} id="character-name" name="character-name" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
                                        <label htmlFor="character-description" className={`input-label-default`} >Descrição do Personagem</label>
                                        <textarea id="character-description" className={`input-text-default`} name="character-description" value={characterDescription} onChange={(e) => setCharacterDescription(e.target.value)} rows={4}></textarea>
                                    </div>
                                </fieldset>
                                <fieldset className={`${styles["attributes-fieldset"]}`}>
                                    <legend className={`item-default`} style={{fontSize: "18px"}}>Atributos</legend>
                                    <div className={`${styles["stat-field"]}`}>
                                        <label htmlFor="attack" className={`input-label-default`} ><img src={`${BASE_ATTRIBUTES_URL}/for_atk.png`} />Ataque</label>
                                        <InputNumber className={`field-default input-default`} id="attack" name="attack" defaultValue={5} min={5} value={characterAttack} onChange={(value) => setCharacterAttack(value ?? 5)} />
                                    </div>
                                    <div className={`${styles["stat-field"]}`}>
                                        <label htmlFor="defense" className={`input-label-default`} ><img src={`${BASE_ATTRIBUTES_URL}/for_def.png`} />Defesa</label>
                                        <InputNumber className={`field-default input-default`} id="defense" name="defense" defaultValue={5} min={5} value={characterDefense} onChange={(value) => setCharacterDefense(value ?? 5)} />
                                    </div>
                                    <div className={`${styles["stat-field"]}`}>
                                        <label htmlFor="health" className={`input-label-default`} ><img src={`${BASE_ATTRIBUTES_URL}/for_life.png`} alt="Vida" />Vida</label>
                                        <InputNumber className={`field-default input-default`} id="health" name="health" defaultValue={100} min={50} value={characterHealth} onChange={(value) => setCharacterHealth(value ?? 100)} />
                                    </div>
                                </fieldset>
                                <fieldset className={`${styles["settings-fieldset"]}`}>
                                    <legend className={`item-default`} style={{fontSize: "18px"}}>Configurações</legend>
                                    <div className={`${styles["option-wrapper"]}`}>
                                        <CheckboxComponent id="character-active" checked={activeCharacter} onToggle={() => setActiveCharacter(!activeCharacter)} />
                                        <label htmlFor="character-active">                                        
                                            <span className={`input-label-default`}>Personagem Ativo</span>
                                        </label>
                                    </div>
                                    <div className={`${styles["option-wrapper"]}`}>
                                        <CheckboxComponent id="character-currency-lock" checked={currencyLockCharacter} onToggle={() => setCurrencyLockCharacter(!currencyLockCharacter)} />
                                        <label htmlFor="character-currency-lock">                                            
                                            <span className={`input-label-default`}>Personagem Bloqueado</span>
                                        </label>
                                    </div>
                                </fieldset>
                                <fieldset className={`${styles["artwork-fieldset"]}`}>
                                    <legend className={`item-default`} style={{fontSize: "18px"}}>Artes</legend>
                                    <div className={`artwork-upload-wrapper ${smallArtworkPreview ? `` : `${styles["content-option-item"]} ${styles["character"]}` }`} onClick={() => uploadSmallArtwork()} onContextMenu={handleRemoveSmallArtwork}>
                                        {smallArtworkPreview 
                                            ? (<img src={smallArtworkPreview} />)
                                            : (
                                                <>
                                                    <UploadOutlined style={{fontSize: "20px"}} />
                                                    <span className={`input-label-default`}>Artwork Criação</span>
                                                </>
                                            )
                                        }
                                        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" style={{display: "none"}} onChange={handleSmallArtwork}/>
                                    </div>
                                </fieldset>
                            </form>
                            <ImageCropModal 
                                open={isCropModalOpen} 
                                onClose={handleSmallArtworkCropClose} 
                                onApply={handleCropApply} 
                                image={selectedSmallArtwork} 
                                cropOptions={{
                                    width: 140,
                                    height: 139
                                }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterCreation;