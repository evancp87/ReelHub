import "@testing-library/jest-dom";
import {
  userApi,
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../src/store/services/userApi";

import { screen, waitFor, render, fireEvent } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { server } from "./server";
import Login from "../../src/components/Login";
import Register from "../../src/components/Login";
import "whatwg-fetch";

describe("account", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should login a user", async () => {
    render(
      <ApiProvider api={userApi}>
        <Login />
      </ApiProvider>
    );
    // Simulates user logging in
    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "testuser@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.click(screen.getByText("Login to your account"));

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByText("Welcome, testuser")).toBeInTheDocument();
    });
  }),
    it("should register a new user", async () => {
      render(
        <ApiProvider api={userApi}>
          <Register />
        </ApiProvider>
      );

      // Simulate user interactions
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "testuser" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "testpassword" },
      });
      fireEvent.click(screen.getByText("Login"));

      // Wait for login to complete
      await waitFor(() => {
        expect(screen.getByText("Welcome, testuser")).toBeInTheDocument();
      });
    });
});
