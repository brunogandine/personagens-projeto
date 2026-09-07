import { useLocation } from "react-router-dom";
import styles from "../Dashboard.module.css"

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Dashboard / Usuários",
  "/dashboard/content": "Dashboard / Conteúdo",
  "/dashboard/content/animes": "Dashboard / Conteúdo / Animes",
  "/dashboard/content/animes/create": "Dashboard / Conteúdo / Animes / Criar",
  "/dashboard/content/characters": "Dashboard / Conteúdo / Personagens",
  "/dashboard/content/characters/create": "Dashboard / Conteúdo / Personagens / Criar",
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