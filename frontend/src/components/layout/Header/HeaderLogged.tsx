import { Dropdown, Avatar} from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { AuthUser } from '../../../types/AuthUser';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type HeaderProps = {
    user: AuthUser
    loading: boolean
}

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
            label: <Link to="/adm-panel">Painel Administrativo</Link>
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

function HeaderLogged({user, loading}: HeaderProps) {
    const handleLogout = async () => {
        const res = await fetch(`${BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            window.location.href = "/";
        }
    }

    return (
        <header id={styles["header-nav"]}>
            <div id={styles["header-container"]}>
                <div id={styles["main-header"]}>
                    <Avatar className={styles["user-pic"]} src={user.avatar_url ? `${BASE_URL}/${user.avatar_url}` : undefined } icon={<UserOutlined />}/>
                    <div className={styles["user-name"]}>
                        {loading ? (<p>Carregando...</p>) : (<p>{user.username}</p>)}
                    </div>
                </div>              
                    <div id={styles["user-header"]}>
                        <div className={styles["level"]}>
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
                        <div className={styles["currency"]}>
                            <div className="currency-icon">
                                <img src={"/assets/images/icons/currency.png"}></img>
                            </div>
                            <div className={`${styles["currency-value"]} gold`}>{user.currency}</div>
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