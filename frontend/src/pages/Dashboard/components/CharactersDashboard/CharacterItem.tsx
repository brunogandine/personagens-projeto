import styles from "../../Dashboard.module.css";
import type { CharacterItem } from "./types/character.types";

type Props = {
    item: CharacterItem
}

const CharacterItemComponent = ({item}: Props) => {
    return (
        <div className={`${styles["character-list-container"]}`}>
            <div className={`${styles["character-list-item"]}`}>
                <img src={`/assets/images/cards/${item.id}/small/${item.id}/${item.id}.jpg`} />
            </div>
        </div>
    );
};

export default CharacterItemComponent