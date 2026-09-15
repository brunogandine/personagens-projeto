import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import type { EditTypes } from "./types/content.types";

type ContentOptionsProps = {
    type: EditTypes;
    open: (type: EditTypes) => void;
};

const ContentOptions = ({type, open}: ContentOptionsProps) => {
    return (
        <div className={`${styles["content-options"]}`}>
            <div className={`${styles["content-option-item"]}`} onClick={() => open(type)}>
                <EditFilled style={{ fontSize: 30, lineHeight: '50px' }} />
            </div>
            <div className={`${styles["content-option-item"]}`}>
                <DeleteFilled style={{ fontSize: 36, lineHeight: '50px' }} />
            </div>
        </div>
    );
};

export default ContentOptions;