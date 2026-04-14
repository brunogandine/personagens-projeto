import { useLocation } from "react-router-dom";
import styles from "../Dashboard.module.css"

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Dashboard / Usuários",
  "/dashboard/characters": "Dashboard / Personagens",
  "/dashboard/settings": "Dashboard / Configurações",
};

const HeaderMainAdmPanel = () => {
    const location = useLocation();

    const title = routeTitles[location.pathname] ?? "Dashboard";

    return (
        <div className={`${styles["dashboard-header"]}`} >
            <span className={`${styles["dashboard-section-title"]}`}>{title}</span>
        </div>
    )
}

export default HeaderMainAdmPanel;