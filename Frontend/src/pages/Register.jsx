import React, { useState, useRef } from "react";
import { isEmail } from "validator";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">Este campo es necesario.</div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">Este campo es necesario.</div>
    );
  }
};

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

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password)
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

        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="border border-gray-500 hover:border-gray-800 focus:bg-gray-100 py-1 px-2 rounded ease-in-out"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="border border-gray-500 hover:border-gray-800 focus:bg-gray-100 py-1 px-2 rounded ease-in-out"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="border border-gray-500 hover:border-gray-800 focus:bg-gray-100 py-1 px-2 rounded ease-in-out"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>

              <div className="flex flex-row pt-3">
                <button
                  className="lg:mx-0 mb-2 bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded ease-linear transition-all duration-150 z-10"
                  disabled={loading}
                >
                  Registrarse
                </button>
                {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {message && (
            <div className="flex flex-col justify-between">
              <div
                className={
                  successful ? className="bg-green-300 px-4 py-2 rounded border border-green-500" : "bg-red-300 px-4 py-2 rounded border border-red-500"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <button style={{ display: "none" }} />
        </form>
        <Link to="/">
          <p className="text-sm pt-2">Volver a Home</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
