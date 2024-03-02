import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import AuthVerify from "../common/AuthVerify";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

const Layout = (auths) => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setShowModeratorBoard(auths.showModeratorBoard);
    setShowAdminBoard(auths.showAdminBoard);
    setCurrentUser(auths.currentUser);

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
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
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/testimonios">Testimonios</Link>
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

        {currentUser && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              User
            </Link>
          </li>
        )}

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
            {/* <li>
               <AuthVerify logOut={logOut}/>
            </li>*/}
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
