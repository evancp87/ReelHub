import "@testing-library/jest-dom";
import {
  userApi,
  useCreateUserMutation,
  useLoginUserMutation,
} from "@/store/services/userApi";

import { screen, waitFor, render, fireEvent } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { server } from "./server";
import Login from "@/components/Login";
import Register from "@/components/Login";
import "whatwg-fetch";

// Mock the useLoginUserMutation hook
jest.mock("@/store/services/userApi", () => ({
  ...jest.requireActual("@/store/services/userApi"),
  useLoginUserMutation: () => [
    jest.fn(),
    { isLoading: false, isSuccess: true, error: null },
  ],
  useCreateUserMutation: () => [
    jest.fn(),
    { isLoading: false, isSuccess: true, error: null },
  ],
}));

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

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "testuser@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.click(screen.getByText("Login to your account"));

    await waitFor(() => {
      expect(screen.getByText("Trending")).toBeInTheDocument();
      expect(screen.getByText("Recommended")).toBeInTheDocument();
    });
  });

  it("should register a new user", async () => {
    render(
      <ApiProvider api={userApi}>
        <Register />
      </ApiProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Repeat Password"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(""), {
      target: { value: null },
    });

    fireEvent.click(screen.getByText("Create an account"));

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });
});
