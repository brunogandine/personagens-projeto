import type { ReactNode } from "react"
import { Header } from "./Header";
import Footer from "./Footer/Footer"

type LayoutTypes = {
    children?: ReactNode;
}

function Layout({ children }: LayoutTypes) {
    return (
        <>
            <Header />

            <div id="main">
                {children}
            </div>

            <Footer />
        </>
    )
}

export default Layout;