import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import Login from "../pages/Login";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

describe("Login", () => {
  const mockAxios = new MockAdapter(axios);

  afterEach(() => {
    mockAxios.reset();
  });

  test("renders Login component", () => {
    render(
      <BrowserRouter>
        <LoggedUserContext.Provider value={{ setLoggedUser: () => {} }}>
          <Login />
        </LoggedUserContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });

  test("renders login form and submits data", async () => {
    // Mock the login API call to return a success response
    mockAxios
      .onPost("http://localhost:3001/login")
      .reply(200, { username: "testUser" });

    render(
      <BrowserRouter>
        <LoggedUserContext.Provider value={{ setLoggedUser: () => {} }}>
          <Login />
        </LoggedUserContext.Provider>
      </BrowserRouter>
    );

    // Assert that the login form is rendered
    expect(screen.getByLabelText("Login:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    // Enter login and password
    fireEvent.change(screen.getByLabelText("Login:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "testPassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Wait for the login status message to appear
    const loginStatusMessage = await screen.findByText(
      "Succesfully logged in!"
    );
    expect(loginStatusMessage).toBeInTheDocument();
  });

  it("renders register form and submits data", async () => {
    // Mock the register API call to return a success response
    mockAxios
      .onPost("http://localhost:3001/register")
      .reply(200, { username: "testUser" });

    render(
      <BrowserRouter>
        <LoggedUserContext.Provider value={{ setLoggedUser: () => {} }}>
          <Login />
        </LoggedUserContext.Provider>
      </BrowserRouter>
    );

    // Click on the "Register" button to show the register form
    // fireEvent.click(screen.getByRole("button", { name: "Register" }));
    fireEvent.click(screen.getByText("No account yet?"));

    // Assert that the register form is rendered
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();

    // Enter username and password
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "testPassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Wait for the register status message to appear
    const registerStatusMessage = await screen.findByText(
      "Succesfully registered user!"
    );
    expect(registerStatusMessage).toBeInTheDocument();
  });
});
