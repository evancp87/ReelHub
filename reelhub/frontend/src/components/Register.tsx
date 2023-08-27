import React from "react";
import { useState } from "react";
import { useCreateUserMutation } from "../store/services/userApi";

type Props = {};

function Register({}: Props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { createUser, isLoading: isRegisteringUser } = useCreateUserMutation;

  const handleRegister = () => {
    try {
      // Handle registration logic here
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <div className="rounded-lg border-2 border-solid border-slate-100">
        <h3>Sign Up</h3>
        <form
          className="flex flex-col"
          action=""
          onClick={handleLogin}
          disabled={isLoggingIn}
        >
          <input className="my-4" type="text" />
          <input className="my-4" type="text" />
          <input className="my-4" type="text" />
          <button>Create an account</button>
        </form>
        <p>Already have an account?</p>
      </div>
    </>
  );
}

export default Register;
