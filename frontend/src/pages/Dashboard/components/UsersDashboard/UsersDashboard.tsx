import { useEffect, useState } from "react";
import styles from "../../Dashboard.module.css";
import { useAuth } from "@/contexts/AuthContext";
import UsersList from "./UsersList"
import UsersPagination from "./UsersPagination";
import { Request } from "@/services/apiClient";
import type { UserAdmin } from "@/types/user";
import type { UserAction } from "@/types/userActions";
import UserSuspensionModal from "./components/UserSuspensionModal";

const UsersDashboard = () => {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [users, setUsers] = useState<UserAdmin[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [activeAction, setActiveAction] = useState<UserAction | null>(null);

    if(!user)
        return null;

    useEffect(() => {
        const loadUsers = async () => {
            const res = await Request.get(`/users/get?page=${page}`);

            if(!res)
                throw new Error(`Falha ao carregar usuários.`);

            setUsers(res.data.data);
            setTotalPages(res.data.meta.totalPages)
        };

        loadUsers();
    }, [page]); 

    useEffect(() => {
        setSelectedUsers([]);
    }, [page]);

    const handleSelectedAction = (action: UserAction) => {
        if(selectedUsers.length === 0)
            return;

        setActiveAction(action);
    };

    const handleActionClose = () => {
        setActiveAction(null);
    }

    const selectedUserObjects = users.filter((user) => selectedUsers.includes(user.id)).map((user) => ({    
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url
        }
    ))

    return (
        <>
            <div className={`${styles["users-content"]}`}>
                <UsersList users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} onAction={handleSelectedAction} />
                <UsersPagination page={page} totalPages={totalPages} onPageChange={setPage}/>
                <UserSuspensionModal
                    open={activeAction === "suspend"}
                    onClose={handleActionClose}
                    selectedUsers={selectedUserObjects}
                />
            </div>
        </>
    )
}

export default UsersDashboard;