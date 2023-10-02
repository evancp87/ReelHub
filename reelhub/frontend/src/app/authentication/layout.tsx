import "../globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Sidebar from "../components/Sidebar";
// import Controls from "../components/Controls";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

import React from "react";
import Image from "next/image";

import MovieIcon from "/public/assets/logo.svg";
import { ReduxProvider } from "../../components/ReduxProvider";

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
