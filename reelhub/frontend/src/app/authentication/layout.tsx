import "../globals.css";

import React from "react";
import Image from "next/image";

import MovieIcon from "/public/assets/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center ">
      <Image
        width="30"
        height="30"
        alt="movie icon"
        src={MovieIcon}
        className="mb-4 self-center"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
