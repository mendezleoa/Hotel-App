import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Testimonios from './pages/Testimonios';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import './output.css';

export default function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout auths={[showModeratorBoard, showAdminBoard, currentUser]} />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="testimonios" element={<Testimonios />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);