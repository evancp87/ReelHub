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
  // repeatPassword: string;
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

  console.log(error);
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

  const handleRegister = (e: any) => {
    e.preventDefault();
    try {
      //   dispatch(registerUser(userInput));
      createUser(userInput);
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/authentication/login");
    }
  }, [isSuccess]);

  const errorByField = (key: string) => {
    const error = errors && errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  return (
    // <ReduxProvider>
    <div className="w-64 rounded-lg bg-darkBlue md:w-80">
      <h3 className="ms-4 mt-4 text-3xl">Sign Up</h3>
      <form className="flex flex-col p-4" action="" onSubmit={handleRegister}>
        <div className="relative">
          <input
            className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("firstName") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="text"
            name="firstName"
            onChange={handleInputs}
            placeholder="First Name"
            value={userInput.firstName}
          />
          {errorByField("firstName") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("firstName")}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("lastName") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="text"
            name="lastName"
            onChange={handleInputs}
            value={userInput.lastName}
            placeholder="Last Name"
          />
          {errorByField("lastName") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("lastName")}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("email") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="text"
            name="email"
            onChange={handleInputs}
            value={userInput.email}
            placeholder="Email"
          />
          {errorByField("email") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("email")}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("password") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="password"
            name="password"
            value={userInput.password}
            onChange={handleInputs}
            placeholder="Password"
          />
          {errorByField("password") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("password")}
            </p>
          )}
        </div>
        {/* <div className="relative">
          <input
            className={`lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
           ${
             errorByField("repeatPassword")
               ? "border-b-2 border-[#FC4747] "
               : {}
           }`}
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            onChange={handleInputs}
            value={userInput.repeatPassword}
          />
          {errorByField("repeatPassword") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("repeatPassword")}
            </p>
          )}
        </div> */}
        <label htmlFor="upload">Choose an avatar (optional)</label>

        <input
          className="lightBlue my-4 cursor-pointer bg-transparent text-xs"
          type="file"
          name="upload"
          onChange={handleInputs}
        />

        {/* handle errors here */}
        <button
          className={`h-9 cursor-pointer rounded-lg bg-red text-xs text-[white] hover:bg-white hover:text-[black] ${
            isLoading && "cursor-not-allowed"
          }`}
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
          {error.data}
        </p>
      )}
    </div>
    // </ReduxProvider>
  );
}

export default Register;
