import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import type { AnimeContentItem, CharacterItem } from "./types/content.types";

type Props = 
    | {
        item: CharacterItem;
        selected: number[];
        onToggle: () => void;
        type: "character"
        imageVersion: string
    }
    | {
        item: AnimeContentItem;
        selected: number[];
        onToggle: () => void;
        type: "anime"
        imageVersion: string
    }


const SelectableContentItem = ({item, selected, onToggle, type, imageVersion}: Props) => {
    const isAnimeDeleted = type === "character" && item.anime.deleted_at !== null;

    const imagePath = {
        "anime": `animes/${item.id}/symbol.jpg`,
        "character": `cards/${item.id}/thumbnail/1/1.png`
    };

    return (
        <>
            <div 
                className={`${styles[`content-list-item`]} ${selected.includes(item.id) ? `${styles["selected"]}` : ""}` } 
                data-id={item.id}
                onClick={onToggle}
            >
                <img className={`${isAnimeDeleted ? "orphaned" : "_"} ${item.deleted_at ? "unavailable no-hover" : item.active ? "_" : "inactive no-hover"}`} src={`/assets/images/${imagePath[type]}${imageVersion}`} />
                <CheckboxComponent 
                    className={`${styles["content-checkbox-custom"]} ${selected.includes(item.id) ? `${styles["selected"]}` : ""}`} 
                    checked={selected.includes(item.id)} 
                />
            </div>
        </>
    );
};

export default SelectableContentItem;