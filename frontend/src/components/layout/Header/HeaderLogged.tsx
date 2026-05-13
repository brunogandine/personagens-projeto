import { Dropdown, Avatar} from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { AuthUser } from '../../../types/authUser';
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const buildAccountDrop = (user: AuthUser) => {
    const account: MenuProps['items'] = [
        {
            key: "home",
            label: <Link to="/home">Home</Link>
        },
        {
            key: "profile",
            label: <Link to="/profile">Perfil</Link>
        },
        {
            key: "support",
            label: <Link to="/support">Suporte</Link>
        }
    ]

    if(user.user_power === "Admin") {
        account.push({
            key: "admin",
            label: <Link to="/dashboard">Painel Administrativo</Link>
        })
    }

    return account
}

const characters: MenuProps['items'] = [
    {
        key: 'myCharacters',
        label: <Link to="/my-characters">Meus Personagens</Link>
    },
    {
        key: 'characterList',
        label: <Link to="/characters">Lista de Personagens</Link>
    }
]

const HeaderLogged = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    if(!user) 
        return null;

    const handleLogout = async () => {
        const result = await logout();

        if(!result.success) {
            console.error(result.message || "Erro desconhecido ao realizar logout.");
            return;
        }

        navigate("/", {
            replace: true,
            state: { message: "Logout realizado com sucesso!" }
        })
    }

    return (
        <header id="nav-header" className={`${styles["nav-header"]}`}>
            <div id="nav-container" className={`${styles["nav-container"]}`}>
                <div id="user-section-container" className={`${styles["user-section-container"]}`}>
                    <div className={`${styles["user-section-me"]}`}>
                        <Avatar className={styles["user-pic"]} src={user.avatar_url ? `${BASE_URL}${user.avatar_url}` : undefined } icon={<UserOutlined />}/>
                        <div className={styles["user-name"]}>
                            {loading ? (<p>Carregando...</p>) : (<p>{user.username}</p>)}
                        </div>
                    </div>
                    <div className={`${styles["user-section-basic"]}`}>
                        <div className={styles["user-level"]}>
                            <p>LEVEL <span className={
                                user.level <= 10 ? "" 
                                : user.level <= 20 ? "green" 
                                : user.level <= 40 ? "gold" 
                                : "orange"
                                }>
                                    {user.level}
                            </span>
                            </p>
                        </div>
                        <div className={styles["user-currency"]}>
                            <div className="currency-icon">
                                <img src={"/assets/images/icons/currency.png"}></img>
                            </div>
                            <div className={`${styles["currency-value"]} gold`}>{user.currency}</div>
                        </div>
                    </div>
                </div>  
                <div className={styles["link-section"]}>
                    <Dropdown classNames={{root: "drop-custom"}} menu={{items: buildAccountDrop(user)}}>
                        <div id="account" className={styles["category-styles"]}>
                                <div className={styles["anchor-links"]}><p>Usuário</p></div>
                        </div>
                    </Dropdown>
                    <Dropdown classNames={{root: "drop-custom"}} menu={{items: characters}}>
                        <div id="character" className={styles["category-styles"]}>
                            <div className={styles["anchor-links"]}>
                                <p>Personagens</p>
                            </div>
                        </div>
                    </Dropdown>
                </div>
                <div className={styles["logout-section"]} onClick={handleLogout}>
                    <LogoutOutlined style={{fontSize: "28px"}}/>
                    <p>Logout</p>
                </div>
            </div>
        </header>
    )
}

export default HeaderLogged;