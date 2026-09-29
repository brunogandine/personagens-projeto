import type { ReactNode } from "react";
import HeaderMainAdmPanel from "./HeaderMainAdmPanel"

type Props = {
    children: ReactNode;
};

const MainComponent = ({children}: Props) => {
    return (
        <div id="adm-content">
            <HeaderMainAdmPanel />
            {children}
        </div>
    )
}

export default MainComponent;