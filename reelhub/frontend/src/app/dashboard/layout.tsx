import "../globals.css";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Controls from "@/components/Controls";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col bg-[#10141E] md:flex-row ">
      <Sidebar />
      <main className="flex min-h-screen w-full flex-col items-center p-4">
        <Controls />
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
