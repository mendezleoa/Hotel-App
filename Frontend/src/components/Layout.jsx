import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

const Layout = (auths) => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    setShowModeratorBoard(auths.showModeratorBoard);
    setShowAdminBoard(auths.showAdminBoard);

    EventBus.on("logout", () => {
      logOut();
    });

    
    return () => {
      setLoading(false);
      EventBus.remove("logout");
    };
  });

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <>
      <nav className="m-2">
        <div className="mmx-auto max-w-screen flex flex-row flex-wrap rounded-lg shadow m-4 items-center justify-between dark:bg-gray-800 bg-gray-100 mx-auto p-2">
          <ul className="font-medium flex flex-wrap lg:text-lg text-sm">
            <li className="p-2 ml-3 md:ml-6 flex place-items-center">
              <img className="lg:h-10 h-8 mr-3" src="Logo.png" alt="Logo" />
              Hotel Bocconnó
            </li>
            <li className="p-2 ml-3 flex place-items-center hover:text-blue-600">
              <Link to="/">Home</Link>
            </li>
            <li className="p-2 ml-3 flex place-items-center hover:text-blue-600">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="p-2 mx-3 flex place-items-center hover:text-blue-600">
              <Link to="/testimonios">Testimonios</Link>
            </li>
            <li className="p-2 ml-3 flex place-items-center hover:text-blue-600">
              <Link to="/rooms">Habitaciones</Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
          </ul>
          {loading ? (
            <span className="text-xl text-slate-50">Loading...</span>
          ) : (
            <>
              {currentUser ? (
                <div className="navbar-nav d-md-block ml-auto">
                  <li className="m-1 flex">
                    <Link to={"/profile"} className="nav-link px-0 py-1">
                      {"Usuario: " + currentUser}
                    </Link>
                  </li>
                  <li className="btn btn-outline-primary m-1">
                    <a
                      href="/login"
                      className="nav-link px-0 py-1"
                      onClick={logOut}
                    >
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav d-md-block ml-auto">
                  <li className="btn btn-outline-primary m-1">
                    <Link to={"/login"} className="nav-link px-0 py-1">
                      Login
                    </Link>
                  </li>

                  <li className="btn btn-outline-primary m-1">
                    <Link to={"/register"} className="nav-link px-0 py-1">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
