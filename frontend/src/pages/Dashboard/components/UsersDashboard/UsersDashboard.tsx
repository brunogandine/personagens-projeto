import styles from "@/pages/Dashboard/components/UsersDashboard/UsersDashboard.module.css";
import UsersList from "./UsersList"
import UsersPagination from "../../shared/DashboardPagination";
import UserSuspensionModal from "./components/UserSuspensionModal";
import UserEditModal from "./components/UserEditModal/UserEditModal";
import UserCharacterConfigModal from "./components/UserCharacterConfigModal/UserCharacterConfigModal";
import UserCharacterFiltersModal from "./components/UserCharacterFiltersModal/UserCharacterFiltersModal";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Request } from "@/services/apiClient";
import type { UserAdmin } from "@/types/user";
import type { UserAction, UserCharacter, UserCharactersFilters } from "@/pages/Dashboard/components/UsersDashboard/types/users.types";

const UsersDashboard = () => {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [users, setUsers] = useState<UserAdmin[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [activeAction, setActiveAction] = useState<UserAction | null>(null);
    const [isUserCharacterConfigModalOpen, setIsUserCharacterConfigModalOpen] = useState(false);
    const [isUserCharacterFilterModalOpen, setIsUserCharacterFilterModalOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<UserCharacter | null>(null);
    const [filters, setFilters] = useState<UserCharactersFilters>({});

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
    };

    const handleCharacterConfigOpen = (c: UserCharacter) => {
        setSelectedCharacter(c);
        setActiveAction(null);
        setIsUserCharacterConfigModalOpen(true);
    };

    const handleCharacterFilterOpen = () => {
        setIsUserCharacterFilterModalOpen(true);
        setActiveAction(null);
    };

    const handleCharacterFilterClose = () => {
        setIsUserCharacterFilterModalOpen(false);
        setActiveAction("edit");
    }

    const handleCharacterConfigClose = () => {
        setSelectedCharacter(null);
        setIsUserCharacterConfigModalOpen(false);
        setActiveAction("edit");
    };

    const selectedUserObjects = users.filter((user) => selectedUsers.includes(user.id)).map((user) => ({    
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url,
            level: user.level,
            currency: user.currency,
            active: user.active,
            characters_count: user.characters_count,
        }
    ));

    return (
        <>
            <div className={`${styles["users-content"]}`}>
                <UsersList users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} onAction={handleSelectedAction} />
                <UsersPagination page={page} totalPages={totalPages} onPageChange={setPage} range={{start: 5, end: 4}}/>
                <UserSuspensionModal
                    open={activeAction === "suspend"}
                    onClose={handleActionClose}
                    selectedUsers={selectedUserObjects}
                />
                {selectedUserObjects.length !== 0 && (
                    <>
                        <UserEditModal 
                            open={activeAction === "edit"} 
                            onClose={handleActionClose}
                            selectedUsers={selectedUserObjects}
                            onOpenCharacterConfig={handleCharacterConfigOpen}
                            openFilters={handleCharacterFilterOpen}
                            filters={filters}
                        />
                        <UserCharacterFiltersModal
                            open={isUserCharacterFilterModalOpen}
                            onClose={handleCharacterFilterClose}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </>
                )}
                {selectedUserObjects.length === 1 && selectedCharacter &&(
                    <UserCharacterConfigModal 
                        open={isUserCharacterConfigModalOpen}
                        onClose={handleCharacterConfigClose}
                        character={selectedCharacter}
                    />
                )}
            </div>
        </>
    )
}

export default UsersDashboard;