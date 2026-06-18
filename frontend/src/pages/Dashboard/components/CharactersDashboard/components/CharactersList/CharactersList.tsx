import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import type { CharacterItem } from "../../types/character.types";
import { Request } from "@/services/apiClient";
import CharacterItemComponent from "../../CharacterItem";
import CharacterOptions from "../../CharacterOptions";
import styles from "../../../../Dashboard.module.css";

const CharactersList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [characters, setCharacters] = useState<CharacterItem[]>([]);

    const [debounceSearch, setDebounceSearch] = useState("");

    const { user } = useAuth();

    if(!user)
        return null;

    const getCharacters = async () => {
        const response = await Request.get("/characters", {
            query: {
                page,
                search
            }
        });

        setCharacters(response?.data.data);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        getCharacters();
    }, [page, debounceSearch]);

    return (
        <>
            <div className={`${styles["character-list"]}`}>
                <span className={`container-title`}>Lista de Personagens</span>
                <div className={`${styles["character-list-search-filters"]}`}>
                    <input 
                        className={`field-default ${styles["character-list-search-input"]}`} 
                        type="text" 
                        placeholder="Pesquisar personagem"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        } }    
                    />
                    <div className={`${styles["character-list-filters"]}`}>
                        <span className={`item-default item-select`}>Filtrar</span>
                    </div>
                </div>
                <div className={`container-default ${styles["character-list-content"]}`}>
                    {characters.length > 0 
                        ? characters.map((character) => (
                            <CharacterItemComponent key={character.id} item={character}/>
                        ))
                        : (
                            <>
                                <span style={{textAlign: "center", fontWeight: "bold"}}>Nenhum personagem encontrado</span>
                                {search && <span style={{textAlign: "center"}}>({search})</span>}
                            </>
                        )
                    }
                </div>
                <CharacterOptions />
            </div>
        </>
    )
}

export default CharactersList;