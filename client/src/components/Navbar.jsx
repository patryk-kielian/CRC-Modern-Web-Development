import { API_URL } from "../config";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import "../styles/Navbar.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";

function Navbar() {
  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
  const [courseCount, setCourseCount] = useState(null);

  useEffect(() => {
    if (loggedUser) {
      Axios.get(`${API_URL}/courses/${loggedUser.id}`).then((response) => {
        setCourseCount(response.data.courses.length);
      });
    }
  }, [loggedUser]);

  const logout = function () {
    // if (!loggedUser) return;
    setLoggedUser(null);
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
            <button className="violet-button my-trainings">
              <Link to="/user">{loggedUser.login}</Link>
            </button>
            {loggedUser.isAdmin && (
              <button className="violet-button my-trainings">
                <Link to="/create-new-training">Create a training</Link>
              </button>
            )}
            <button className="violet-button my-trainings" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button className="violet-button my-trainings">
              <Link to="/login">Register</Link>
            </button>
            <button className="violet-button my-trainings">
              <Link to="/login">Log in</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
