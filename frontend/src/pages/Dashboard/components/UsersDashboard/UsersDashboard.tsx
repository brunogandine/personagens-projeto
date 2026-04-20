import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import styles from "../../Dashboard.module.css";
import { useAuth } from "@/contexts/AuthContext";
import UsersPagination from "./UsersPagination";
import { Request } from "@/services/apiClient";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
    active: boolean;
    currency: number;
    level: number;
};

const UsersDashboard = () => {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [users, setUsers] = useState<User[]>([]);

    if(!user)
        return null;

    useEffect(() => {
        const loadUsers = async () => {
            const res = await Request.get(`/users/get?page=${page}`);

            if(!res)
                throw new Error(`Falha ao carregar usuários.`)

            setUsers(res.data.data);
            setTotalPages(res.data.totalPages)
        };

        loadUsers();
    }, [page]); 

    return (
        <>
            <div className={`${styles["users-content"]}`}>
                <UsersPagination page={page} totalPages={totalPages} onPageChange={setPage}/>
                <div className={`${styles["app-users-list"]}`}>
                    <div className="users-content">
                        <div className="users-list-section">
                            <div className={`${styles["users-list-section-title"]}`}>
                                <span>Lista de Usuários</span>
                            </div>
                            <div className="users-list-section-content">
                                <table className={`${styles["users-list-table"]}`}>
                                    <colgroup>
                                        <col width="72px" />
                                        <col />
                                        <col width="120px" />
                                        <col width="300px" />
                                        <col width="80px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>ID</th>
                                            <th>Usuário</th>
                                            <th>E-mail</th>
                                            <th>Status</th>
                                            <th>Level</th>
                                            <th>Dinheiro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (users.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <Avatar
                                                        className={styles["avatar-pic"]} 
                                                        src={user.avatar_url ? `${BASE_URL}${user.avatar_url}` : undefined }
                                                        icon={<UserOutlined />}
                                                    />
                                                </td>
                                                <td>{user.id}</td>
                                                <td className={`${styles["users-list-name"]}`}>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.active ? "Ativo" : "Inativo"}</td>
                                                <td>{user.level}</td>
                                                <td>{user.currency}</td>
                                            </tr>
                                        ))) : (    
                                                <tr>
                                                    <td colSpan={7} style={{ textAlign: "center" }}>
                                                        Nenhum usuário encontrado
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersDashboard;