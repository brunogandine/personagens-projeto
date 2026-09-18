import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

type ContentOptionsProps = {
    openEdit: () => void;
    openDelete: () => void;
};

const ContentOptions = ({openEdit, openDelete}: ContentOptionsProps) => {
    return (
        <div className={`${styles["content-options"]}`}>
            <div className={`${styles["content-option-item"]}`} onClick={openEdit}>
                <EditFilled style={{ fontSize: 30, lineHeight: '50px' }} />
            </div>
            <div className={`${styles["content-option-item"]}`} onClick={openDelete}>
                <DeleteFilled style={{ fontSize: 36, lineHeight: '50px' }} />
            </div>
        </div>
    );
};

export default ContentOptions;