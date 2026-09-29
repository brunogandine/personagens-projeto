import { Header } from "./Header";
import Footer from "./Footer/Footer"
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <div id="main">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout;