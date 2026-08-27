import { useEffect, useState } from "react";
import styles from "./Home.module.css"
import { getCharactersCount, getUsersCount } from "../../services/statisticsService";
import VerticalRuler from "../../components/Utils/VerticalRuler";

const HomeLogged = () => {
    const [loading, setLoading] = useState(true);
    const [usersValue, setUsersValue] = useState();
    const [charactersValue, setCharactersValue] = useState();

    useEffect(() => {  
        const loadData = async () => {
            try { const [users, characters] = await Promise.all([ 
                getUsersCount(), 
                getCharactersCount() ]) 

                if(users !== null) setUsersValue(users); 
                if(characters !== null) setCharactersValue(characters);
            } finally { 
                setLoading(false); 
            }} 

            loadData(); 
        }, []);

    return (
        <div id={styles["home-content"]}>
            <div className={styles["project-title"]}>
                <h1>PROJETO [LISTA DE PERSONAGENS E CRIAÇÃO]</h1>
            </div>
            <div id={styles["home-statistics"]}>
                <div className={styles["user-counts"]}>
                    <div className={styles["counts-title"]}>
                        <h1>USUÁRIOS REGISTRADOS</h1>
                    </div>
                    <div className={styles["counts-value"]}>
                        {loading ? "" : (
                            <span className={(usersValue ?? 0) <= 20 ? "" : (usersValue ?? 0) <= 50 ? "gold" : "orange" }>{usersValue}</span>) }
                    </div>
                </div>
                <VerticalRuler color="#FFFFFF"/>
                <div className={styles["character-counts"]}>
                    <div className={styles["counts-title"]}>
                        <h1>PERSONAGENS NO JOGO</h1>
                    </div>
                    <div className={styles["counts-value"]}>
                        {loading ? "" : (
                            <p>{charactersValue}</p>) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLogged;