import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import Navbar from "../components/Navbar";
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
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Succesfully logged in!");
        setLoggedUser(response.data[0].login);
        navigate("/");
      }
    });
  };

  return (
    <>
      <Navbar />
      <main id="container">
        <h1>{registerMode ? "Create an account" : "Welcome back!"}</h1>
        <form className="form-login">
          <label htmlFor="login">Login:</label>

          <input
            type="text"
            id="login"
            name="login"
            placeholder="Type login"
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
            }}
          >
            <span className="fine-button">
              {registerMode ? "Already have an account? " : "No account yet? "}
            </span>{" "}
            {registerMode ? "Login" : "Register"}
          </button>
        </form>
        <h1>{loginStatus}</h1>
      </main>
    </>
  );
}

export default Login;
