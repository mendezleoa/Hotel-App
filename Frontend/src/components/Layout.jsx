import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

const Layout = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setCurrentUser(await AuthService.getCurrentUser());
      const userData = await AuthService.getUserData();
      if (userData) {
        setShowAdminBoard(userData.user.rol);
      }
      setLoading(false);
    };

    EventBus.on("logout", () => {
      logOut();
    });

    fetchData();
  }, []);

  const logOut = async () => {
    await AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  function toggleDarkMode() {
    setTheme(theme === "light" ? "dark" : "light");
    const root = document.querySelector("body"); // Puedes usar 'body' en lugar de 'html' si prefieres
    root.classList.toggle("dark-mode");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
      document.querySelector("html")?.classList.remove("light");
    } else {
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.add("light");
    }
  }, [theme]);

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
              <label className="inline-flex ml-3 items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={toggleDarkMode}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Modo oscuro
                </span>
              </label>
              {currentUser ? (
                <div className="flex flex-row justify-middle ml-auto">
                  <li className="m-1">
                    <Link to={"/profile"} className="px-0 py-1">
                      {"Usuario: " + currentUser}
                    </Link>
                  </li>
                  <li className="bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded ease-linear transition-all duration-150 z-10 my-0.5 mr-3 md:mr-6 ">
                    <a href="/login" className="px-0 py-0" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="flex flex-row ml-auto">
                  <li className="bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded ease-linear transition-all duration-150 z-10 m-1">
                    <Link to={"/login"} className="px-0 py-1">
                      Login
                    </Link>
                  </li>

                  <li className="bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded ease-linear transition-all duration-150 z-10 m-1">
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
