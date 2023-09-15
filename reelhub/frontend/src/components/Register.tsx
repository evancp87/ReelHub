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
import { validateRegister } from "@/validation/index";
import Link from "next/link";
import { ReduxProvider } from "./ReduxProvider";
type Error = {
  firstName: null;
  lastName: null;
  email: null;
  password: null;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  //   repeatPassword: string;
  avatar?: File;
};

function Register() {
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
  const [errors, setErrors] = useState(null);
  //   const dispatch = useAppDispatch();
  const router = useRouter();
  const handleInputs = async (e) => {
    const { name, value } = e.target;
    setUserInput((inputs) => ({ ...inputs, [name]: value }));
    try {
      const payload = { [name]: value };
      const res = await validateRegister(payload);
      setErrors(res);
    } catch (error) {
      console.log("There was an error:", error);
    }
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
      <div className="w-64 rounded-lg bg-darkBlue md:w-80">
        <h3 className="ms-4 mt-4 text-3xl">Sign Up</h3>
        <form className="flex flex-col p-4" action="" onSubmit={handleRegister}>
          <div className="relative">
            <input
              className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errors ? "border-b-2 border-[#FC4747] " : {}}`}
              type="text"
              name="firstName"
              onChange={handleInputs}
              placeholder="First Name"
              value={userInput.firstName}
            />
            {errors &&
              errors.map((error, index) =>
                error.key === "firstName" ? (
                  <p
                    className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]"
                    key={index}
                  >
                    {error.message}
                  </p>
                ) : null
              )}
          </div>

          <div className="relative">
            <input
              className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errors ? "border-b-2 border-[#FC4747] " : {}}`}
              type="text"
              name="lastName"
              onChange={handleInputs}
              value={userInput.lastName}
              placeholder="Last Name"
            />
            {errors &&
              errors.map((error, index) =>
                error.key === "lastName" ? (
                  <p
                    className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]"
                    key={index}
                  >
                    {error.message}
                  </p>
                ) : null
              )}
          </div>

          <div className="relative">
            <input
              className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errors ? "border-b-2 border-[#FC4747] " : {}}`}
              type="text"
              name="email"
              onChange={handleInputs}
              value={userInput.email}
              placeholder="Email"
            />
            {errors &&
              errors.map((error, index) =>
                error.key === "email" ? (
                  <p
                    className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]"
                    key={index}
                  >
                    {error.message}
                  </p>
                ) : null
              )}
          </div>

          <div className="relative">
            <input
              className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errors ? "border-b-2 border-[#FC4747] " : {}}`}
              type="password"
              name="password"
              value={userInput.password}
              onChange={handleInputs}
              placeholder="Password"
            />
            {errors &&
              errors.map((error, index) =>
                error.key === "password" ? (
                  <p
                    className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]"
                    key={index}
                  >
                    {error.message}
                  </p>
                ) : null
              )}
          </div>
          {/* <label htmlFor="repeatPassword">Repeat Password</label>

          <input
            className="my-4"
            type="password"
            name="repeatPassword"
            onChange={handleInputs}
            value={user.repeatPassword}
          /> */}
          <label htmlFor="upload">Choose an avatar (optional)</label>

          <input
            className="lightBlue my-4 cursor-pointer bg-transparent text-xs"
            type="file"
            name="upload"
            onChange={handleInputs}
          />

          {/* handle errors here */}
          <button
            className="h-9 cursor-pointer rounded-lg bg-red text-xs text-[white] hover:bg-white hover:text-[black]"
            type="submit"
            disabled={isLoading}
          >
            Create an account
          </button>
        </form>
        <div className="mb-4 ms-2.5 flex justify-center gap-x-1.5 text-xs">
          <p>Already have an account?</p>{" "}
          <Link className="text-red" href="login">
            Login
          </Link>
        </div>
        {error && (
          <p className="min-h-30 my-4 flex justify-center text-xs text-red ">
            error.data.message
          </p>
        )}
      </div>
    </ReduxProvider>
  );
}

export default Register;
