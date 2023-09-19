// "use client";

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
// https://www.youtube.com/watch?v=Yokjzp91A4o
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Controls from "@/components/Controls";
import { ReduxProvider } from "@/components/ReduxProvider";
import { useGetTrendingMediaQuery } from "../../store/services/mediaApi";
import TrendingCard from "@/components/TrendingCard";
import AuthProvider from "../../components/AuthProvider";

// const handle;
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <ReduxProvider>
          <AuthProvider>
            <div className="flex flex-col bg-[#10141E] md:flex-row ">
              <Sidebar />
              <main className="flex min-h-screen w-full flex-col items-center  p-[2em]">
                <Controls />
                {children}
              </main>
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
