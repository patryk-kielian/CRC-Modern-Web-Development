import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { expect } from "vitest";

describe("App", () => {
  test("renders Home component for the '/' route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Don’t wait - start training now!")
    ).toBeInTheDocument();
  });

  test("renders User component for the '/user' route", () => {
    render(
      <MemoryRouter initialEntries={["/user"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText("This page is only for logged in users")
    ).toBeInTheDocument();
  });

  test("renders CreateNewTraining component for the '/create-new-training' route", () => {
    render(
      <MemoryRouter initialEntries={["/create-new-training"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText("You must have admin permissions to view this page")
    ).toBeInTheDocument();
  });

  test("renders Login component for the '/login' route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });
});
