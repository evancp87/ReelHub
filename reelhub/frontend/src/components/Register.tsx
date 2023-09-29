"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCreateUserMutation } from "../store/services/userApi";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
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
  avatar?: string | null;
};

function Register() {
  const [userInput, setUserInput] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // repeatPassword: "",
    avatar: null,
  });

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // This effect will run whenever the `image` state changes
    console.log("checking the image", image);
    setUserInput((inputs) => ({ ...inputs, avatar: image }));
  }, [image]);

  //   const { loading, user, error, success } = useAppSelector(selectAuthState);

  //   const { createUser, isLoading: isRegisteringUser } = useCreateUserMutation;
  const [createUser, { isLoading, isSuccess, error, isError }] =
    useCreateUserMutation();

  const [errors, setErrors] = useState(null);
  //   const dispatch = useAppDispatch();
  const router = useRouter();
  // const handleInputs = async (e) => {
  //   const { name, value, files } = e.target;
  //   setUserInput((inputs) => ({ ...inputs, [name]: value }));
  //   try {
  //     const payload = { [name]: value };
  //     const res = await validateRegister(payload);
  //     setErrors(res);
  //   } catch (error) {
  //     console.log("There was an error:", error);
  //   }
  // };

  function previewFiles(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageUrl = reader.result;
      console.log("checking the image url", imageUrl);
      setImage(imageUrl);
    };
  }

  const handleInputs = async (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handle file inputs
      const file = files[0];
      previewFiles(file);
      console.log("checking if there's a file", file);
      console.log("checking the image", image);
      setUserInput((inputs) => ({ ...inputs, avatar: image }));
    } else {
      // Handle other inputs
      setUserInput((inputs) => ({ ...inputs, [name]: value }));

      try {
        const payload = { [name]: value };
        const res = await validateRegister(payload);
        setErrors(res);
      } catch (error) {
        console.log("There was an error:", error);
      }
    }
  };

  const onImageChosen = (e) => {
    const file = e.target.files[0];
    previewFiles(file);
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    try {
      //   dispatch(registerUser(userInput));
      console.log(userInput);
      createUser(userInput);
    } catch (error) {
      console.log("There was an error", error);
    }
  };
  console.log(isLoading, isSuccess, error, isError);
  console.log("is it successful", isSuccess);
  console.log(error);

  useEffect(() => {
    if (isSuccess) {
      router.push("/authentication/login");
    }
  }, [isSuccess]);

  const errorByField = (key: string) => {
    const error = errors && errors.find((error) => error.key === key);
    return error ? error.message : "";
  };
  console.log("checking the avatar", userInput.avatar);
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
          name="avatar"
          onChange={handleInputs}
          // onChange={onImageChoosen}

          accept="image/png, image/jpeg, image/jpg, image/jfif"
        />

        {/* handle errors here */}
        <button
          className={`h-9 cursor-pointer rounded-lg bg-red text-xs text-[white] hover:bg-white hover:text-[black] ${
            isLoading && "flex cursor-not-allowed justify-center"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <MoonLoader color="#ffffff" className="h-[30px] w-[30px]" />
          ) : (
            "Create an account"
          )}
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
