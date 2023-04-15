import { Link } from "react-router-dom";

function Navbar() {
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
        <div className="counter">
          <span className="number">2</span>
        </div>
        <button className="violet-button my-trainings">My trainings</button>
        <button className="violet-button my-trainings">
          <Link to="/create-new-training">Create a training</Link>
        </button>
        <button className="violet-button my-trainings">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
