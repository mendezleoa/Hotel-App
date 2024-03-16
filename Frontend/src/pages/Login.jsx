import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const vusername = (value) => {
  if (value.length < 3 || value.length > 255) {
    return (
      <div className="invalid-feedback d-block">
        El nombre de usuario debe tener 3 y 20 caracteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 1024) {
    return (
      <div className="invalid-feedback d-block">
        La contraseña debe tener 6 y 40 caracteres.
      </div>
    );
  }
};

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">Este campo es necesario</div>
    );
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(username, password)
      .then((response) => {
        if (!response.error) {
          navigate("/profile");
        } else {
          const resMessage = response.error;
          error.message || error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group pt-3">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <input type="submit" style={{ display: "none" }} />
        </form>
        <Link to="/">
          <p className="text-sm pt-2">Volver a Home</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
