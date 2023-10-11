// "use client";

import Dashboard from "@/components/Dashboard";
import React from "react";

export default async function Home() {
  return (
    <div className="contents">
      <div className="flex w-full flex-col md:flex-row ">
        <Dashboard />
      </div>
    </div>
  );
}
