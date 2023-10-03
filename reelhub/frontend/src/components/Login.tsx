"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "@/utils/helpers";
import Link from "next/link";
import { setCredentials } from "@/store/services/usersSlice";
import { validateLogin } from "@/validation/index";
import ClipLoader from "react-spinners/ClipLoader";
import { useLoginUserMutation } from "@/store/services/userApi";
import { useRouter } from "next/navigation";

function Login() {
  type User = {
    email: string;
    password: string;
  };

  const [userInput, setUserInput] = useState<User>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const [loginUser, { isLoading, isSuccess, error }] = useLoginUserMutation();

  // function to find errors and return the message
  const errorByField = (key: string) => {
    const error = errors && errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputs = async (e) => {
    const { name, value } = e.target;
    // updates state with dynamic object keys
    setUserInput((inputs) => ({ ...inputs, [name]: value }));

    try {
      // joi validation
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

      // Dispatch setCredentials with the data from loginUser
      dispatch(setCredentials(data));
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  // on successful auth redirects user to dashboard
  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess]);

  return (
    <div className="w-64 rounded-lg bg-darkBlue md:w-80">
      <h3 className="ms-4 mt-4 text-3xl">Login</h3>
      <form className="flex flex-col p-4" onSubmit={handleLogin}>
        <div className="relative w-full">
          <input
            className={`field my-4 my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none 
            ${errorByField("email") ? "border-[#FC4747]" : ""}`}
            type="text"
            onChange={handleInputs}
            value={userInput.email}
            placeholder="Email Address"
            name="email"
            required
          />
          {errorByField("email") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("email")}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <input
            className={` field my-4 my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 opacity-75 focus:opacity-100 focus:outline-none 
            ${errorByField("password") ? "border-[#FC4747]" : ""}`}
            type="password"
            onChange={handleInputs}
            value={userInput.password}
            placeholder={"Password"}
            name="password"
            required
          />

          {errorByField("password") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("password")}
            </p>
          )}
        </div>

        <button
          className={`mb-4 h-9 cursor-pointer rounded-lg bg-red text-[white] hover:bg-white hover:text-[black] ${
            isLoading && "cursor-not-allowed"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={10} />
          ) : (
            " Login to your account"
          )}
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
