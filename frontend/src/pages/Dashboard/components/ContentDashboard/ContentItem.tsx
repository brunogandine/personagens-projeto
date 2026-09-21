import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import type { CharacterDelete } from "./types/content.types";

type ContentItemProps = {
    item: CharacterDelete;
    type: "anime" | "character";
    hoverable: boolean;
}

const ContentItem = ({item, type, hoverable}: ContentItemProps) => {
    return (
        <>
            <div className={`${styles[`content-list-item`]} ${styles[type]}` } data-id={item.id} >
                <img className={hoverable ? `` : `${styles["no-hover"]}`} src={`/assets/images/cards/${item.id}/thumbnail/1/1.png`} />
                <span style={{color: "var(--orange-500)", fontSize: "16px", fontWeight: "bold"}}>{item.name}</span>
            </div>
        </>
    );
};

export default ContentItem;