"use client";

import LandingPage from "@/components/LandingPage";

export default async function Home() {
  return (
    <div>
      <div className="flex flex-col bg-[#10141E] md:flex-row ">
        <main className="flex min-h-screen w-full flex-col items-center ">
          <LandingPage />
        </main>
      </div>
    </div>
  );
}
