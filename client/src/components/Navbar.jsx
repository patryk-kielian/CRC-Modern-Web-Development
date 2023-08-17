import { API_URL } from "../config";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../contexts/LoggedUserContext";

function Navbar() {
  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
  const [courseCount, setCourseCount] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      Axios.get(`${API_URL}/courses/${loggedUser.id}`).then((response) => {
        setCourseCount(response.data.courses.length);
      });
    }
  }, [loggedUser]);

  const logout = function () {
    const token = localStorage.getItem("jwtToken");
    if (!Axios.defaults.headers.common["Authorization"]) {
      Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    Axios.get(`${API_URL}/logout`)
      .then((res) => {
        localStorage.removeItem("jwtToken");
        delete Axios.defaults.headers.common["Authorization"];
        setLoggedUser(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav>
      <div id="navbar-left">
        <Link to="/">
          <img
            className="navbar-logo"
            src="/icons/company_icon.svg"
            alt="Trainings App Logo"
          />
        </Link>
      </div>
      <div id="navbar-right">
        {loggedUser ? (
          <>
            <div className="counter">
              <span className="number">{courseCount}</span>
            </div>
            <button
              className="violet navbar-button"
              onClick={() => navigate("/user")}
            >
              {loggedUser.login}
            </button>
            {loggedUser.isAdmin ? (
              <button
                className="violet navbar-button"
                onClick={() => navigate("/create-new-tutorial")}
              >
                <span className="navbar-button-long">
                  Create a new tutorial
                </span>
                <span className="navbar-button-short">New tutorial</span>
              </button>
            ) : null}
            <button className="violet navbar-button" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              className="violet navbar-button"
              onClick={() => navigate("/login/reg")}
            >
              Register
            </button>
            <button
              className="violet navbar-button"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
