import { API_URL } from "../config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/Login.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";

function Login() {
  const [registerMode, setRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const { setLoggedUser } = useContext(LoggedUserContext);
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post(`${API_URL}/login`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Succesfully logged in!");
        setLoggedUser(response.data);
        navigate("/");
      }
    });
  };

  const registerUser = (e) => {
    e.preventDefault();
    Axios.post(`${API_URL}/register`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        console.log(response);
      } else {
        setLoginStatus("Succesfully registered user!");
        setRegisterMode(false);
        setUsername("");
        setPassword("");
      }
    });
  };

  return (
    <>
      <main id="container">
        <h1>{registerMode ? "Create an account" : "Welcome back!"}</h1>
        <form className="form-login">
          <label htmlFor="login">{registerMode ? "Username:" : "Login:"}</label>

          <input
            type="text"
            id="login"
            name="login"
            placeholder="Type login"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label htmlFor="login">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            className="violet-button login-button"
            type="submit"
            value={registerMode ? "Register" : "Login"}
            onClick={registerMode ? registerUser : loginUser}
          />
          <button
            className="ghost-button register-account-button"
            onClick={(e) => {
              e.preventDefault();
              setRegisterMode(!registerMode);
              setUsername("");
              setPassword("");
            }}
          >
            <span className="fine-button">
              {registerMode ? "Already have an account? " : "No account yet? "}
            </span>{" "}
            {registerMode ? "Login" : "Register"}
          </button>
        </form>
        <h1 className="form-status">{loginStatus}</h1>
      </main>
    </>
  );
}

export default Login;
