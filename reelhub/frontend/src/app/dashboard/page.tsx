// "use client";

import Dashboard from "@/components/Dashboard";
import AuthProvider from "../../components/AuthProvider";
import React, { useEffect, useCallback } from "react";
import HomePage from "@/components/HomePage";
// import layout from "./layout";
// import type { TypedUseSelectorHook } from "react-redux";
import { ReduxProvider } from "../../components/ReduxProvider";

// import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Layout from "./layout";
import {
  useGetMediaQuery,
  useGetTrendingMediaQuery,
} from "../../store/services/mediaApi";
import Sidebar from "@/components/Sidebar";
// import Dashboard from "@/components/Dashboard";
import Controls from "@/components/Controls";
// import type { RootState, AppDispatch } from "../../store/";

// import type { TypedUseSelectorHook } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import { useDispatch, useSelector } from "react-redux";
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {
  selectCurrentUser,
  selectCurrentToken,
} from "@/store/services/usersSlice";
export default async function Home() {
  // const { isLoading, isFetching, data, error } = useGetMediaQuery(null);
  // const { isLoading, isFetching, data, error } = useGetTrendingMediaQuery(null);
  // const dispatch = useAppDispatch();
  // const getUser = useAppSelector(selectCurrentUser);
  // const storedToken = useAppSelector(selectCurrentToken);
  // const checkUser = useCallback(() => {
  //   if (storedToken) {
  //     dispatch(getUser(userId));
  //   }
  // }, [storedToken]);
  return (
    // <Layout>
    // <ReduxProvider>

    <div className="contents">
      <div className="flex w-full flex-col bg-[#10141E] md:flex-row ">
        {/* <Sidebar /> */}

        {/* <main className="flex min-h-screen w-full flex-col  items-center pt-[2em]"> */}
        {/* <Controls /> */}
        {/* <AuthProvider> */}
        <Dashboard />
        {/* </AuthProvider> */}
        {/* </main> */}
      </div>
    </div>
    // </ReduxProvider>
  );
}
