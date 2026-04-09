import type { ReactNode } from "react";
import HeaderMainAdmPanel from "./HeaderMainAdmPanel"

type Props = {
    children: ReactNode;
};

const DashboardContent = ({children}: Props) => {
    return (
        <div id="dashboard-content">
            <HeaderMainAdmPanel />
            {children}
        </div>
    )
}

export default DashboardContent;