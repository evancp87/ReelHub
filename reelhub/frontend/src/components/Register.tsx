"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCreateUserMutation } from "../store/services/userApi";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectCurrentUser,
  selectAuthState,
} from "../store/services/usersSlice";
import type { TypedUseSelectorHook } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReduxProvider } from "./ReduxProvider";
type Props = {};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  //   repeatPassword: string;
  avatar?: File;
};

function Register({}: Props) {
  const [userInput, setUserInput] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // repeatPassword: "",
    avatar: undefined,
  });

  //   const { loading, user, error, success } = useAppSelector(selectAuthState);

  //   const { createUser, isLoading: isRegisteringUser } = useCreateUserMutation;
  const [createUser, { isLoading, isSuccess, error, isError }] =
    useCreateUserMutation();

  //   const dispatch = useAppDispatch();
  const router = useRouter();
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserInput((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleRegister = () => {
    try {
      //   dispatch(registerUser(userInput));
      createUser(userInput);
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);
  return (
    <ReduxProvider>
      <div className="rounded-lg border-2 border-solid border-slate-100">
        <h3>Sign Up</h3>
        <form className="flex flex-col" action="" onSubmit={handleRegister}>
          <label htmlFor="firstName">First Name</label>
          <input
            className="my-4"
            type="text"
            name="firstName"
            onChange={handleInputs}
            value={userInput.firstName}
          />
          <label htmlFor="lastName">Last Name</label>

          <input
            className="my-4"
            type="text"
            name="lastName"
            onChange={handleInputs}
            value={userInput.lastName}
          />
          <label htmlFor="email">Email Address</label>

          <input
            className="my-4"
            type="text"
            name="email"
            onChange={handleInputs}
            value={userInput.email}
          />
          <label htmlFor="password">Password</label>

          <input
            className="my-4"
            type="password"
            name="password"
            value={userInput.password}
            onChange={handleInputs}
          />
          {/* <label htmlFor="repeatPassword">Repeat Password</label>

          <input
            className="my-4"
            type="password"
            name="repeatPassword"
            onChange={handleInputs}
            value={user.repeatPassword}
          /> */}
          <label htmlFor="upload">Upload Avatar Image</label>

          <input
            className="my-4"
            type="file"
            name="upload"
            onChange={handleInputs}
          />

          {/* handle errors here */}
          <button className="btn-primary" type="submit" disabled={isLoading}>
            Create an account
          </button>
        </form>
        <Link href="login">Already have an account?</Link>
      </div>
    </ReduxProvider>
  );
}

export default Register;
