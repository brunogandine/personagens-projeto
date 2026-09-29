import type { ReactNode } from "react"
import { Header } from "./Header";
import Footer from "./Footer/Footer"
import { useLocation } from "react-router-dom";

type LayoutTypes = {
    children?: ReactNode;
}

const Layout = ({ children }: LayoutTypes) => {
    const location = useLocation();

    const shouldHideFooter = location.pathname.startsWith("/adm");

    return (
        <>
            <Header />

            <div id="main">
                {children}
            </div>

            {!shouldHideFooter && <Footer />}
        </>
    )
}

export default Layout;