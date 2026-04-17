import styles from "../../../Dashboard.module.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/date";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type RecentUser = {
    id: number;
    username: string;
    avatar_url: string | null;
    created_at: string;
}[];

type Props = {
    loading: boolean;
    recentUsers: RecentUser;
}

const DashboardRecentsUsers = ({loading, recentUsers}: Props) => {
    return (
        <>
            {loading 
                ? <p>Carregando...</p>
                : <div className={`${styles["app-last-users"]}`}>
                    <div className="last-users-section">
                        <div className={`${styles["last-users-section-title"]}`}>
                            <span>Últimos Usuários</span>
                        </div>
                        <div className="last-users-section-content">
                            <table className={`${styles["last-users-table"]}`}>
                                <colgroup>
                                    <col width="74px" />
                                    <col span={1} />
                                    <col width="180px" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Usuário</th>
                                        <th>Hora do Registro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map((user) => (
                                        <tr>
                                            <td>
                                                <Avatar 
                                                    className={styles["avatar-pic"]} 
                                                    src={user.avatar_url ? `${BASE_URL}${user.avatar_url}` : undefined} 
                                                    icon={<UserOutlined />}
                                                />
                                            </td>
                                            <td className={`${styles["last-user-name"]}`}>{user.username}</td>
                                            <td className={`${styles["last-user-time"]}`}>{formatDate(user.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
    
        </>
    )
}

export default DashboardRecentsUsers;