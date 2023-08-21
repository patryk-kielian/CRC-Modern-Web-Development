import { API_URL } from "../config";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import "../styles/Login.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Popup from "../components/Popup";
import Error from "./Error";

function Login() {
  const { mode } = useParams();

  const [registerMode, setRegisterMode] = useState(mode === "reg"); // true - register mode, false - login mode
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setRegisterMode(mode === "reg");
  }, [mode]);

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post(`${API_URL}/login`, {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.message) {
          setMessage(response.data.message);
          setShowPopup(true);
        } else {
          setMessage("Succesfully logged in!");
          setShowPopup(true);
          const token = response.data.token;
          // Store the token in localStorage for persistence
          localStorage.setItem("jwtToken", token);
          Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          setLoggedUser(response.data.user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
        setShowPopup(true);
      });
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setMessage("Passwords do not match!");
      setShowPopup(true);
      return;
    }
    if (password.length < 4) {
      setMessage("Password needs to be at least 4 characters long");
      setShowPopup(true);
      return;
    }
    Axios.post(`${API_URL}/register`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
        setShowPopup(true);
      } else {
        setMessage("Succesfully registered! You can log in now");
        setRegisterMode(false);
        setShowPopup(true);
        setUsername("");
        setPassword("");
        setPasswordCheck("");
      }
    });
  };

  /**
   * Trims the user inputs in order to prevent submitting usernames and passwords with trailing spaces
   */
  const trimInputs = () => {
    setUsername((prev) => prev.trimEnd());
    setPassword((prev) => prev.trimEnd());
    setPasswordCheck((prev) => prev.trimEnd());
  };

  return (
    <>
      {!loggedUser ? (
        <main className="login-background">
          <div className="login-content">
            <h2>{registerMode ? "Create an account" : "Welcome back!"}</h2>
            <form className="login-form">
              <div className="login-form-inputs">
                <div className="login-form-input-block">
                  <label htmlFor="login">
                    {registerMode ? "Username:" : "Login:"}
                  </label>

                  <input
                    type="text"
                    id="login"
                    name="login"
                    placeholder="Type username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onBlur={trimInputs}
                  />
                </div>
                <div className="login-form-input-block">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={trimInputs}
                  />
                </div>
                <div className="login-form-input-block">
                  {registerMode ? (
                    <>
                      <label htmlFor="password">Confirm Password:</label>
                      <input
                        type="password"
                        id="passwordCheck"
                        name="passwordCheck"
                        placeholder="Repeat password"
                        value={passwordCheck}
                        onChange={(e) => {
                          setPasswordCheck(e.target.value);
                        }}
                      />
                    </>
                  ) : (
                    <p className="login-tip">
                      Tip: To have the ability to create and manage tutorials,
                      use the following credentials:
                      <br />
                      username: admin
                      <br />
                      password: test
                    </p>
                  )}
                </div>
              </div>
              <div className="login-buttons">
                <input
                  className="violet login-button"
                  type="submit"
                  value={registerMode ? "Register" : "Log in"}
                  onClick={registerMode ? registerUser : loginUser}
                />
                <button
                  className="ghost-black register-account-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setRegisterMode(!registerMode);
                    setUsername("");
                    setPassword("");
                    setPasswordCheck("");
                  }}
                >
                  <span className="fine-button">
                    {registerMode
                      ? "Already have an account? "
                      : "No account yet? "}
                  </span>{" "}
                  {registerMode ? "Login" : "Register"}
                </button>
              </div>
            </form>
          </div>
        </main>
      ) : (
        <Error
          textMessage={
            "You are already logged in! If you want to change users, log out first"
          }
          textButton={"Back to Home"}
          route={"/"}
        />
      )}

      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
}

export default Login;
