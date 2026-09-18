import CheckboxComponent from "@/shared/components/Checkbox/Checkbox";
import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
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


const SelectableContentItem = ({item, selected, onToggle}: Props) => {
    return (
        <>
            <div 
                className={`${styles[`content-list-item`]} ${selected.includes(item.id) ? `${styles["selected"]}` : ""}` } 
                data-id={item.id}
                onClick={onToggle}
            >
                <img className={`${item.deleted_at ? "unavailable no-hover" : item.active ? "" : "inactive no-hover"}}`} src={item.image} />
                <CheckboxComponent 
                    className={`${styles["content-checkbox-custom"]} ${selected.includes(item.id) ? `${styles["selected"]}` : ""}`} 
                    checked={selected.includes(item.id)} 
                />
            </div>
        </>
    );
};

export default SelectableContentItem;