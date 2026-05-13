import type { UserAdmin } from "@/types/user";
import type { UserAction } from "@/types/userActions";
import styles from "../../Dashboard.module.css";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, StopFilled, UserOutlined } from "@ant-design/icons";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
    users: UserAdmin[];
    selectedUsers: number[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>;
    onAction: (action: UserAction) => void;
}

const UsersList = ({users, selectedUsers, setSelectedUsers, onAction}: Props) => {
    const toggleUser = (id: number) => {
        setSelectedUsers(prev => 
            prev.includes(id)
                ? prev.filter(userId => userId !== id)
                : [...prev, id]
            )
    };

    const isAllSelect = selectedUsers.length === users.length && users.length > 0;
    const isSomeSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;
    const hasSelection = selectedUsers.length > 0;

    return (
            <div className={`${styles["app-users-list"]}`}>
                <div className={`${styles["users-list-section"]}`}>
                    <div className={`${styles["users-list-section-title"]}`}>
                        <span>Lista de Usuários</span>
                        <div className={`${styles["users-list-options"]}`}>
                            <div
                                className={`${styles["checkbox"]} ${styles["all"]} ${isAllSelect ? styles["checked"] : ""} ${isSomeSelected ? styles["mixed"] : ""}`}
                                role="checkbox"
                                aria-checked={
                                    isAllSelect ? "true" : isSomeSelected ? "mixed" : "false"}
                                tabIndex={0}
                                onClick={() => {
                                    if(isAllSelect) {
                                        setSelectedUsers([]);
                                    } else {
                                        setSelectedUsers(users.map(user => user.id));
                                    };
                                }}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();

                                        if(isAllSelect) {
                                            setSelectedUsers([]);
                                        } else {
                                            setSelectedUsers(users.map(user => user.id));
                                        };
                                    }
                                }}
                            >
                            </div>
                                <div className={`${styles["extended-options"]} ${(hasSelection) ? styles["open"] : ""}`}>
                                    <Tooltip 
                                        title={
                                            hasSelection 
                                            ? "Banir/Suspender Usuário(s)" 
                                            : null
                                        }        
                                        destroyOnHidden={true} 
                                    >
                                        <StopFilled style={{fontSize: "15px", cursor: hasSelection ? "pointer" : "auto"}} onClick={() => onAction("suspend")}/>
                                    </Tooltip>
                                    <Tooltip 
                                        title={
                                            hasSelection 
                                            ? "Editar Usuário(s)"
                                            : null
                                        } 
                                        destroyOnHidden={true} 
                                    >
                                        <EditOutlined style={{fontSize: "15px", cursor: hasSelection ? "pointer" : "auto"}} onClick={() => onAction("edit")}/>
                                    </Tooltip>
                                </div>
                        </div>
                    </div>
                    <div className="users-list-section-content" style={{overflow: "hidden, auto"}}>
                        <table className={`${styles["users-list-table"]}`}>
                            <colgroup>
                                <col width="30px" />
                                <col width="72px" />
                                <col />
                                <col width="120px" />
                                <col width="300px" />
                                <col width="80px" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Avatar</th>
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
                                            <div
                                                className={`${styles["checkbox"]} ${styles["single"]} ${selectedUsers.includes(user.id) ? styles["checked"] : ""}`}
                                                role="checkbox"
                                                aria-checked={selectedUsers.includes(user.id)}
                                                tabIndex={0}
                                                onClick={() => toggleUser(user.id)}
                                                onKeyDown={(e) => {
                                                    if(e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();

                                                        toggleUser(user.id);
                                                    };
                                                }}
                                            >
                                            </div>
                                        </td>
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
    )
}

export default UsersList;