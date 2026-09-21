import styles from "@/pages/Dashboard/components/ContentDashboard/ContentDashboard.module.css";
import { DeleteFilled, EditFilled, UndoOutlined } from "@ant-design/icons";

type ContentOptionsProps = {
    openEdit: () => void;
    openDelete: () => void;
    openRestore: () => void;
};

const ContentOptions = ({openEdit, openDelete, openRestore}: ContentOptionsProps) => {
    return (
        <div className={`${styles["content-options"]}`}>
            <div className={`${styles["content-option-item"]}`} onClick={openEdit}>
                <EditFilled style={{ fontSize: 30, lineHeight: '50px' }} />
            </div>
            <div className={`${styles["content-option-item"]}`} onClick={openDelete}>
                <DeleteFilled style={{ fontSize: 36, lineHeight: '50px' }} />
            </div>
            <div className={`${styles["content-option-item"]}`} onClick={openRestore}>
                <UndoOutlined style={{ fontSize: 36, lineHeight: '50px' }} />
            </div>
        </div>
    );
};

export default ContentOptions;