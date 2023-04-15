import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main id="container">
        <h1>Welcome back!</h1>
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
            value="Login"
          />
        </form>
      </main>
    </>
  );
}

export default Home;
