import { useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [registerMode, setRegisterMode] = useState(false);

  return (
    <>
      <Navbar />
      <main id="container">
        <h1>{registerMode ? "Create an account" : "Welcome back!"}</h1>
        <form className="form-login">
          <label htmlFor="login">Login:</label>

          <input type="text" id="login" name="login" placeholder="Type login" />
          <br />
          <label htmlFor="login">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type password"
          />
          <br />
          <br />
          <input
            className="violet-button login-button"
            type="submit"
            value={registerMode ? "Register" : "Login"}
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
      </main>
    </>
  );
}

export default Login;
