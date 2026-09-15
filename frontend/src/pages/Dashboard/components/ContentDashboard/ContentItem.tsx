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


const ContentItemComponent = ({item, selected, onToggle}: Props) => {
    if(item.id === 1)
        console.log("ITEM 1:", item.image);

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