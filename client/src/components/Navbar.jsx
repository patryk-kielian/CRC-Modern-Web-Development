import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

function Navbar() {
  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);

  const logout = function () {
    if (!loggedUser) return;
    setLoggedUser(null);
  };

  return (
    <header>
      <div id="header-left">
        <Link to="/">
          <img
            src="\src\assets\icons\company_icon.svg"
            alt="Trainings App Logo"
          />
          <h1>Trainings</h1>
        </Link>
      </div>
      <div id="header-right">
        {loggedUser ? (
          <>
            <div className="counter">
              <span className="number">2</span>
            </div>
            <button className="violet-button my-trainings">
              {loggedUser.login}
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
          <button className="violet-button my-trainings">
            <Link to="/login">Log in</Link>
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
