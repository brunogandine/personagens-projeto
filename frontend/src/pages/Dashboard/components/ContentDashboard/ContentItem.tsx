import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import type { AnimeDelete, CharacterDelete } from "./types/content.types";

type Props = 
    | {
        item: CharacterDelete;
        type: "character";
        hoverable: boolean;
    }
    | {
        item: AnimeDelete;
        type: "anime";
        hoverable: boolean;
    }

const ContentItem = ({item, type, hoverable}: Props) => {
    const imagePath = {
        "anime": `/assets/images/animes/${item.id}/symbol.jpg`,
        "character": `/assets/images/cards/${item.id}/thumbnail/1/1.png`
    }

    return (
        <>
            <div className={`${styles[`content-list-item`]} ${styles[type]}` } data-id={item.id} >
                <img className={hoverable ? `` : `${styles["no-hover"]}`} src={`${imagePath[type]}`} />
                <span style={{color: "var(--orange-500)", fontSize: "16px", fontWeight: "bold"}}>{item.name}</span>
            </div>
        </>
    );
};

export default ContentItem;