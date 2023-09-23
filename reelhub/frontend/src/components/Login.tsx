"use client";

import React, { useState, useEffect } from "react";
import { useCreateUserMutation } from "../store/services/userApi";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import Link from "next/link";
import { setCredentials } from "@/store/services/usersSlice";
import { validateLogin } from "@/validation/index";
import { AuthToken, LoginCredentials } from "../store/services/types";
import {
  useLoginUserMutation,
  //   useGetUserInfoQuery,
} from "../store/services/userApi";
import {
  loginUser,
  selectCurrentUser,
  selectAuthState,
} from "../store/services/usersSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Error = {
  email: null;
  password: null;
};

function Login() {
  type User = {
    email: string;
    password: string;
  };

  const [userInput, setUserInput] = useState<User>({
    email: "",
    password: "",
  });
  const notify = () => toast("Please check your login details and try again");
  const [errors, setErrors] = useState(null);
  //   const { loading, user, error, success } = useAppSelector(selectAuthState);
  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();

  //   const userEmail = userInput?.email;

  //   const { data: getUserInfo } = useGetUserInfoQuery(userEmail);
  //   console.log("getUserInfo data:", getUserInfo);

  // const { getUserInfo } = useGetUserInfoQuery(null);

  console.log(isSuccess);
  //   const { createUser, isLoading: isRegisteringUser } = useCreateUserMutation;
  const errorByField = (key: string) => {
    const error = errors && errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleInputs = async (e) => {
    const { name, value } = e.target;
    setUserInput((inputs) => ({ ...inputs, [name]: value }));

    try {
      const payload = { [name]: value };
      const res = await validateLogin(payload);
      setErrors(res);
    } catch (error) {
      console.log("There was an error:", error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = userInput;
    try {
      const { data } = await loginUser({ email, password });
      console.log("checking the data here", data);
      //   console.log("checking the id here", data._id);

      // Dispatch setCredentials with the data from loginUser
      dispatch(setCredentials(data));
      //   loginUser({ email, password });
      //     dispatch(setCredentials(userInput));
      //   useGetUserInfoQuery(email);
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
    console.log("is redirecting");
  }, [isSuccess]);
  return (
    <div className="w-64 rounded-lg bg-darkBlue md:w-80">
      <h3 className="ms-4 mt-4 text-3xl">Login</h3>
      <form
        className="flex flex-col p-4"
        onSubmit={handleLogin}

        // disabled={isLoggingIn}
      >
        <div className="relative w-full">
          <input
            className={`my-4 my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none 
            ${errorByField("email") ? "border-[#FC4747]" : ""}`}
            type="text"
            onChange={handleInputs}
            value={userInput.email}
            placeholder="Email Address"
            //   title={errors.email}
            name="email"
          />

          {/* {errors && errorByField("email")}
           */}

          {errorByField("email") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("email")}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <input
            className={` my-4 my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 opacity-75 focus:opacity-100 focus:outline-none 
            ${errorByField("password") ? "border-[#FC4747]" : ""}`}
            type="password"
            onChange={handleInputs}
            value={userInput.password}
            placeholder={"Password"}
            //   title={errors.password}
            name="password"
          />

          {/* {errors && errorByField("password")}
           */}
          {errorByField("password") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("password")}
            </p>
          )}
        </div>

        <button
          className="mb-4 h-9 cursor-pointer rounded-lg bg-red text-[white] hover:bg-white hover:text-[black]"
          type="submit"
          disabled={isLoading}
        >
          Login to your account
        </button>
      </form>
      <div className="mb-4 ms-2.5 flex justify-center gap-x-1.5 text-xs">
        <p>Don't have an account?</p>{" "}
        <Link href="register" className="cursor-pointer text-red">
          Sign Up
        </Link>
      </div>
      {error && (
        <p className="min-h-30 my-4 flex justify-center text-xs text-red">
          {error.data.error}
        </p>
      )}
    </div>
  );
}

export default Login;
