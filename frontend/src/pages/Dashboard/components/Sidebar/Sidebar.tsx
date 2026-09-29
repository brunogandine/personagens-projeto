import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined, TeamOutlined, ProfileFilled, SettingFilled } from "@ant-design/icons";
import MenuGroup from "./components/MenuGroup";
import { useAuth } from "@/contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_ADM_PATH = "/dashboard";

const menuItems = [
    {
        title: "Geral",
        items: [
            {
                name: "Usuários",
                path: `${BASE_ADM_PATH}/users`,
                icon: <TeamOutlined />
            },
            {
                name: "Conteúdo",
                path: `${BASE_ADM_PATH}/content`,
                icon: <ProfileFilled />
            },
            {
                name: "Configurações",
                path: `${BASE_ADM_PATH}/settings`,
                icon: <SettingFilled />
            }
        ]
    }
]

const Sidebar = () => {
    const { user } = useAuth();

    if(!user) 
        return null;

    return (
        <>
            <div id="sidebar" className={`${styles["sidebar"]}`}>
                <div className={`${styles["user-info"]}`}>
                    <div className="user-avatar">
                        <Avatar size={46} src={`${BASE_URL}${user.avatar_url}`} icon={<UserOutlined />} />
                    </div>
                    <div className={`${styles["user-container"]}`}>
                        <div className={`${styles["user-name"]}`}>{user.username}</div>
                    </div>
                </div>
                <div className={`${styles["sidebar-menu"]}`}>
                    <div className={`${styles["dashboard-item"]}`}>
                        <NavLink 
                            to={BASE_ADM_PATH}
                            end
                            className={({isActive}) => `${styles["dashboard-main-link"]} ${isActive ? styles["active"] : ""}`}
                        >
                            Visão Geral
                        </NavLink>
                    </div>
                    {menuItems.map((item) => (
                        <MenuGroup key={item.title} title={item.title} items={item.items} />
                    ))}
                    <div className={`${styles["dashboard-menu-footer"]}`}>
                        <a href="/">Voltar ao site</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;