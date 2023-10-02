import "../globals.css";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});
import React from "react";
import Sidebar from "@/components/Sidebar";
import Controls from "@/components/Controls";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={outfit.className}>
        <div className="flex flex-col bg-[#10141E] md:flex-row ">
          <Sidebar />
          <main className="flex min-h-screen w-full flex-col items-center p-4">
            <Controls />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
