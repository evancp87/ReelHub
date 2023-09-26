"use client";

import Dashboard from "@/components/Dashboard";
import AuthProvider from "../components/AuthProvider";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
// import layout from "./layout";
// import type { TypedUseSelectorHook } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";

// import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Layout from "./layout";
import {
  useGetMediaQuery,
  useGetTrendingMediaQuery,
} from "../store/services/mediaApi";
import Sidebar from "@/components/Sidebar";
// import Dashboard from "@/components/Dashboard";
import Controls from "@/components/Controls";
export default async function Home() {
  // const { isLoading, isFetching, data, error } = useGetMediaQuery(null);
  // const { isLoading, isFetching, data, error } = useGetTrendingMediaQuery(null);

  return (
    // <Layout>
    <div>
      <div className="flex flex-col bg-[#10141E] md:flex-row ">
        {/* <Sidebar /> */}

        <main className="flex min-h-screen w-full flex-col items-center ">
          {/* <Controls /> */}
          {/* <AuthProvider>
            <Dashboard /> */}
          {/* </AuthProvider> */}
          <LandingPage />
        </main>
      </div>
    </div>
  );
}
