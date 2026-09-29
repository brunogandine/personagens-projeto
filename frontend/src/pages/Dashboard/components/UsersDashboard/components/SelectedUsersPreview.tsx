import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { SelectedUserPreview } from "../types/userPreview.types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
    users: SelectedUserPreview[];
    maxVisible: number;
}

const SelectedUsersPreview = ({users, maxVisible}: Props) => {
    const visibleUsers = users.slice(0, maxVisible);
    const overflowUsers = users.length - visibleUsers.length;

    return (
        <div className={`${styles["users-preview-container"]}`}>
            {visibleUsers.map((user) => (
                <Tooltip title={user.username} placement="bottom" destroyOnHidden={true}>
                    <div className={`${styles["users-selected"]}`}>
                        <Avatar size={22} style={{flexShrink: "0"}} src={user.avatar_url ? `${BASE_URL}${user.avatar_url}` : undefined} icon={<UserOutlined ></UserOutlined>} />
                        <div className={`${styles["suspension-user-name"]}`}>
                            {user.username}
                        </div>
                    </div>
                </Tooltip>
            ))}
            {overflowUsers > 0 && (
                <div className={`${styles["users-overflow"]}`}>
                    +{overflowUsers} Selecionados
                </div>
            )}
        </div>
    )
}

export default SelectedUsersPreview;