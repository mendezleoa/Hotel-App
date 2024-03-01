import { Outlet, Link } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/testimonios">Testimonios</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;