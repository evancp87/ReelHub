"use client";

import React, { useState, useEffect } from "react";
import { useCreateUserMutation } from "../store/services/userApi";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import Link from "next/link";
import { login } from "@/store/services/usersSlice";
import { useLoginUserMutation } from "../store/services/userApi";
import {
  loginUser,
  selectCurrentUser,
  selectAuthState,
} from "../store/services/usersSlice";
import { useRouter } from "next/navigation";

type Props = {};

function Login({}: Props) {
  type User = {
    email: string;
    password: string;
  };

  const [userInput, setUserInput] = useState<User>({
    email: "",
    password: "",
  });
  //   const { loading, user, error, success } = useAppSelector(selectAuthState);
  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();
  console.log(isSuccess);
  //   const { createUser, isLoading: isRegisteringUser } = useCreateUserMutation;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserInput((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleLogin = () => {
    try {
      loginUser(userInput);
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
    console.log("is redirecting");
  }, [isSuccess]);
  return (
    <div className="rounded-lg border-2 border-solid border-slate-100">
      <h3>Login</h3>
      <form
        className="flex flex-col"
        onSubmit={handleLogin}

        // disabled={isLoggingIn}
      >
        <input
          className="my-4"
          type="text"
          onChange={handleInputs}
          value={userInput.email}
          placeholder="email"
          name="email"
        />
        <input
          className="my-4"
          type="password"
          onChange={handleInputs}
          value={userInput.password}
          placeholder="password"
          name="password"
        />
        <button type="submit" disabled={isLoading}>
          Login to your account
        </button>
      </form>
      <Link href="register">Don't have an account?</Link>
    </div>
  );
}

export default Login;
