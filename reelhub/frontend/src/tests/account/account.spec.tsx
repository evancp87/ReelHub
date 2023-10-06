import "whatwg-fetch";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import {
  userApi,
  useCreateUserMutation,
  useLoginUserMutation,
} from "@/store/services/userApi";
import { login } from "./accountMocks";
import { screen, waitFor, render, fireEvent } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { server } from "./server";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useRouter } from "next/navigation";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../store/services/usersSlice";

jest.mock("next/navigation");

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      token: "mock-token",
    },
  },
});

jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    ...originalModule,
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

const { useSelector, useDispatch } = jest.requireMock("react-redux");

const mockDispatch = jest.fn();

useDispatch.mockReturnValue(mockDispatch);
useSelector.mockImplementation((selector: any) =>
  selector(mockStore.getState())
);

const mockPush = jest.fn();

const mockedUseRouter = useRouter as jest.Mock;

mockedUseRouter.mockReturnValue({
  push: mockPush,
});

describe("account", () => {
  beforeAll(() => {
    mockPush.mockClear();
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
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
    // await waitFor(() => {
    //   expect(mockPush).toHaveBeenCalledWith("/dashboard");
    // });
  });

  it("should register a new user", async () => {
    render(
      <ApiProvider api={userApi}>
        <Register />
      </ApiProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "testuser@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testuser123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "testuser123" },
    });

    fireEvent.click(screen.getByText("Create an account"));

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });
});
