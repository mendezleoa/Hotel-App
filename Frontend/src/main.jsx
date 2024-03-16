import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Rooms from "./pages/Rooms";
import ReservationRoom from "./pages/ReservationRoom";
import Testimonios from "./pages/Testimonios";
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./main.css";

export default function App() {
  const [role, setRole] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setRole(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout auths={[role, currentUser]} />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<ReservationRoom />} />
          <Route path="testimonios" element={<Testimonios />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
