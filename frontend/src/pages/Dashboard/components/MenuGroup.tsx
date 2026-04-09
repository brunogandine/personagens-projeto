import styles from "../Dashboard.module.css";
import { NavLink } from "react-router-dom";

type MenuGroupProps = {
    title: string;
    items: {
        name: string;
        path: string;
    }[];
}

const MenuGroup = ({ title, items }: MenuGroupProps) => {
    return (
        <>
            <div id="users-menu" className={`${styles["menu-group"]}`}>
                <div className={`${styles["menu-group-title"]}`}>{title}</div>
                <ul className={`${styles["menu-group-list"]}`}>
                    {items.map((item) => (
                        <li key={item.path} className={`${styles["menu-group-item"]}`}>
                            <NavLink 
                                to={item.path}
                                className={({isActive}) => `${styles["dashboard-link"]} ${isActive ? styles["active"] : ""}`}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default MenuGroup;