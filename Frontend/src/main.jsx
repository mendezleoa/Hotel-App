import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Rooms from "./pages/Rooms";
import Reservaciones from "./pages/Reservaciones";
import ReservationRoom from "./pages/ReservationRoom";
import Testimonios from "./pages/Testimonios";
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./main.css";

export default function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    localStorage.getItem('theme')
  }, []);

  const handleTheme = () => {
    setTheme();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout themeToggle={[theme, handleTheme]} />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="reserva" element={<Reservaciones />} />
          <Route
            path="reserva/:id/:datefrom/:dateto"
            element={<ReservationRoom />}
          />
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
