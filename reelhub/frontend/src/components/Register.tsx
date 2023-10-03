"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCreateUserMutation } from "../store/services/userApi";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/validation/index";
import Link from "next/link";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  avatar?: string | null;
};

function Register() {
  const [userInput, setUserInput] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    avatar: null,
  });

  // handles setting an image
  const [image, setImage] = useState<string | null>(null);
  const notifySuccess = () => toast("User successfully created");

  useEffect(() => {
    // This effect will run whenever the image state changes
    setUserInput((inputs) => ({ ...inputs, avatar: image }));
  }, [image]);

  const [createUser, { isLoading, isSuccess, error, isError }] =
    useCreateUserMutation();

  const [errors, setErrors] = useState(null);
  const router = useRouter();

  // handles converting a file to a base 64 encoded format for transportation
  function previewFiles(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setImage(imageUrl);
    };
  }

  const handleInputs = async (e) => {
    const { name, value, files } = e.target;

    // if file, convert file and include in handling of inputs
    if (files) {
      const file = files[0];
      previewFiles(file);
      setUserInput((inputs) => ({ ...inputs, avatar: image }));
    } else {
      // if no avatar uploaded, handle other inputs
      setUserInput((inputs) => ({ ...inputs, [name]: value }));

      try {
        // handles repeatPassword, which joi schema alone can't validate without config
        let payload;
        if (name === "repeatPassword") {
          payload = { password: userInput.password, repeatPassword: value };
        } else {
          payload = { [name]: value };
        }

        const res = await validateRegister(payload);
        setErrors(res);
      } catch (error) {
        console.log("There was an error:", error);
      }
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    try {
      // destructures repeatPassword as to not send to server
      const { repeatPassword, ...user } = userInput;
      // sends user to server
      createUser(user);
      notifySuccess();
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  // redirects successful user to login
  useEffect(() => {
    if (isSuccess) {
      router.push("/authentication/login");
    }
  }, [isSuccess]);

  // displays error
  const errorByField = (key: string) => {
    const error = errors && errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  return (
    <div className="w-64 rounded-lg bg-darkBlue md:w-80">
      <h3 className="ms-4 mt-4 text-3xl">Sign Up</h3>
      <ToastContainer />
      <form className="flex flex-col p-4" action="" onSubmit={handleRegister}>
        <div className="relative">
          <input
            className={`field lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("firstName") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="text"
            name="firstName"
            onChange={handleInputs}
            placeholder="First Name"
            value={userInput.firstName}
            required
          />
          {errorByField("firstName") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("firstName")}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`field lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("lastName") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="text"
            name="lastName"
            onChange={handleInputs}
            value={userInput.lastName}
            placeholder="Last Name"
            required
          />
          {errorByField("lastName") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("lastName")}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`field lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
            ${errorByField("email") ? "border-b-2 border-[#FC4747] " : {}}`}
            type="text"
            name="email"
            onChange={handleInputs}
            value={userInput.email}
            placeholder="Email"
            required
          />
          {errorByField("email") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("email")}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className={`field lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
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
        <div className="relative">
          <input
            className={`field lightBlue my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none
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
            required
          />
          {errorByField("repeatPassword") && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {errorByField("repeatPassword")}
            </p>
          )}
        </div>
        <label htmlFor="upload">Choose an avatar (optional)</label>

        <input
          className="lightBlue my-4 cursor-pointer bg-transparent text-xs"
          type="file"
          name="avatar"
          onChange={handleInputs}
          accept="image/png, image/jpeg, image/jpg, image/jfif"
        />

        {/* handle errors here */}
        <button
          className={`h-9 cursor-pointer rounded-lg bg-red text-xs text-[white] hover:bg-white hover:text-[black] ${
            isLoading && "flex cursor-not-allowed items-center justify-center"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={10} />
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
  );
}

export default Register;
