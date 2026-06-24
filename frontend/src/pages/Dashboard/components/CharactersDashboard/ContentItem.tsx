import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import styles from "../../Dashboard.module.css";
import type { AnimeItemViewModel, CharacterItemViewModel } from "./types/content.types";

type Props = 
    | {
        item: CharacterItemViewModel;
        selected: number[];
        onToggle: () => void;
    }
    | {
        item: AnimeItemViewModel;
        selected: number[];
        onToggle: () => void;
    }


const ContentItemComponent = ({item, selected, onToggle}: Props) => {
    return (
        <>
            <div 
                className={`${styles[`content-list-item`]} ${selected.includes(item.id) ? `${styles["selected"]}` : ""} ${item.active ? "" : "inactive"}` } 
                data-id={item.id}
                onClick={() => onToggle()}
            >
                <img src={item.image} />
                <CheckboxComponent 
                    className={`${styles["content-checkbox-custom"]} ${selected.includes(item.id) ? `${styles["selected"]}` : ""}`} 
                    checked={selected.includes(item.id)} 
                />
            </div>
        </>
    );
};

export default ContentItemComponent;