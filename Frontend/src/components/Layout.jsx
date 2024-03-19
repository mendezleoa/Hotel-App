import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

const Layout = (auths) => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setCurrentUser(await AuthService.getCurrentUser());
      const userData = await AuthService.getUserData();
      setShowAdminBoard(userData.user.rol);
      setLoading(false);
    };

    EventBus.on("logout", () => {
      logOut();
    });

    fetchData();
    return () => {
      setLoading(false);
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="m-2">
        <div className="mmx-auto max-w-screen flex flex-row flex-wrap rounded-lg shadow m-4 items-center justify-between dark:bg-gray-800 bg-gray-100 mx-auto p-2">
          <ul className="font-medium flex flex-wrap lg:text-sm text-xs">
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
            <li className="p-2 ml-3 flex place-items-center hover:text-blue-600">
              <Link to="/testimonios">Testimonios</Link>
            </li>
            <li className="p-2 ml-3 flex place-items-center hover:text-blue-600">
              <Link to="/reserva">Reservaciones</Link>
            </li>

            {showAdminBoard && (
              <li className="p-2 flex place-items-center hover:text-blue-600">
                <Link to="/rooms">Habitaciones</Link>
              </li>
            )}
          </ul>
          {loading ? (
            <span className="text-xl text-slate-50">Loading...</span>
          ) : (
            <>
              {currentUser ? (
                <div className="flex flex-row justify-middle ml-auto">
                  <li className="m-1">
                    <Link to={"/profile"} className="px-0 py-1">
                      {"Usuario: " + currentUser}
                    </Link>
                  </li>
                  <li className="btn btn-outline-primary my-0.5 mr-3 md:mr-6 ">
                    <a
                      href="/login"
                      className="px-0 py-0"
                      onClick={logOut}
                    >
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="flex flex-row ml-auto">
                  <li className="btn btn-outline-primary m-1">
                    <Link to={"/login"} className="px-0 py-1">
                      Login
                    </Link>
                  </li>

                  <li className="btn btn-outline-primary m-1">
                    <Link to={"/register"} className="px-0 py-1">
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
    </div>
  );
};

export default Layout;
