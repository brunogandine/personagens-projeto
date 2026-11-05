import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { Modal } from "antd";
import type { UserCharacter } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";
import { EditFilled } from "@ant-design/icons";

type Props = {
    open: boolean;
    onClose: () =>  void;
    character: UserCharacter;
};

const UserCharacterConfigModal = ({open, onClose, character}: Props) => {
    const exp_percentage = (character.exp / 500) * 100;

    return (
        <Modal title={`Detalhes do Personagem`} wrapClassName={`modal-default`} open={open} onCancel={onClose} width={`fit-content`} footer >
            <div className={`${styles["character-details-content"]}`}>
                <div className={`${styles["details-artwork"]}`}>
                    <div className={`${styles["artwork"]}`}>
                        <img src={`/assets/images/cards/${character.character_id}/artwork/1/1.png`} />
                    </div>
                </div>
                <div className={`${styles["details-general"]}`}>
                    <div className={`${styles["general-info"]}`}>
                        <div className={`${styles["name"]}`}>
                            <span>{character.character_name}</span>
                        </div>
                        <div className={`${styles["level"]}`}>
                            <span >Level {character.level}</span>
                            <span style={{justifySelf: "end"}} >{character.exp}/500 &#40;{Math.round(exp_percentage)}%&#41;</span>
                            <div className={`${styles["exp-bar"]}`}>
                                <div className={`${styles["fill-bar"]}`} style={{width: `${exp_percentage}%`}}></div>
                            </div>
                        </div>
                        <div className={`${styles["info-container"]}`}>
                            <div className={`${styles["general"]}`}>
                                <div className={`${styles["title"]}`}>
                                    <span style={{fontSize: "16px", fontWeight: "bold"}} >Informações Gerais</span>
                                </div>
                                <div className={`${styles["info"]}`}>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="anime">Anime</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="anime">Naruto</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="rarity">Raridade</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="rarity">Comum</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="acquired">Adquirido em</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="acquired">01/01/2027</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="guild">Guilda</label>
                                        <div className={`${styles["value"]}`}>                                            
                                            <span id="guild" style={{color: "#00eeff"}}>Sparking!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["battle-statistics"]}`}>
                                <div className={`${styles["title"]}`}>
                                    <span style={{fontSize: "16px", fontWeight: "bold"}}>Estatísticas de Batalha</span>
                                </div>
                                <div className={`${styles["info"]}`}>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="winpvp">Vitórias PVP</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="winpvp">{character.wins_pvp || 0}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="winnpc">Vitórias NPC</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="winnpc">{character.wins_npc || 0}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="losepvp">Derrotas PVP</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="losepvp">{character.loses_pvp || 0}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="losenpc">Derrotas NPC</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="losenpc">{character.loses_npc || 0}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="drawpvp">Empates PVP</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="drawpvp">{character.draws_pvp || 0}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="drawnpc">Empates NPC</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="drawnpc">{character.draws_npc || 0}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles["stats"]}`}>
                                <div className={`${styles["title"]}`}>
                                    <span style={{fontSize: "16px", fontWeight: "bold"}}>Atributos</span>
                                </div>
                                <div className={`${styles["info"]}`}>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="hp">Vida</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="hp">{character.for_hp || 100}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="atk">Ataque</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="atk">{character.for_atk || 10}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                    <div className={`${styles["info-item"]}`}>
                                        <label htmlFor="def">Defesa</label>
                                        <div className={`${styles["value"]}`}>
                                            <span id="def">{character.for_def || 10}</span>
                                            <EditFilled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UserCharacterConfigModal;