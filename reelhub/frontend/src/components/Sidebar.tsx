"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import Empty from "../../public/assets/icon-bookmark-empty.svg";
import Full from "../../public/assets/icon-bookmark-full.svg";
import Movies from "../../public/assets/icon-category-movie.svg";
import Tv from "../../public/assets/icon-category-tv.svg";
import NavBookmark from "../../public/assets/icon-nav-bookmark.svg";
import NavHome from "../../public/assets/icon-nav-home.svg";
import NavTv from "../../public/assets/icon-nav-tv-series.svg";
import NavMovies from "../../public/assets/icon-nav-movies.svg";
import { setCredentials } from "../store/services/usersSlice";
import Play from "../../public/assets/icon-play.svg";
import Search from "../../public/assets/icon-search.svg";
import Avatar from "../../public/assets/image-avatar.png";
import Link from "next/link";
import { ReduxProvider } from "./ReduxProvider";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  useLogoutUserMutation,
  useGetUserInfoQuery,
} from "../store/services/userApi";
// import { useGetUserInfoQuery } from "../store/services/userApi";
import { useRouter, usePathname } from "next/navigation";

import {
  selectCurrentUser,
  selectCurrentToken,
  logout,
} from "../store/services/usersSlice";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type Props = {};

export default function Sidebar({}: Props) {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const userEmail: string = user?.email!;
  const router = useRouter();
  const currentRoute = usePathname();

  console.log("the user is", user);
  console.log("checking the id", user?._id);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // logoutUser();
    dispatch(logout());
    router.push("/authentication/login");
  };

  // const { data, isLoading, isSuccess, error, isError } =
  //   useGetUserInfoQuery();

  // console.log("user data", data?.firstName);
  return (
    <>
      <aside className=" flex h-24 flex-row items-center justify-between bg-darkBlue sm:mx-[0.5em] sm:mt-[1.5em] sm:rounded-xl md:mx-[2em] md:h-[70vh] md:w-[75px] md:max-w-[75x] md:flex-col lg:h-screen">
        <Image
          className=" ml-4 mr-2 sm:mr-0 md:ml-0 md:mt-4"
          src={Logo}
          alt="logo"
          width="32"
          height="25"
        />
        <div className="flex flex-row gap-4 md:flex-col">
          <Link href="/dashboard">
            <Image
              className={`nav-icon ${
                currentRoute === "/dashboard" ? "active" : ""
              }`}
              src={NavHome}
              alt="dashboard home link"
              width="32"
              height="25"
            />
          </Link>
          <Link href="/dashboard/movies">
            <Image
              className={`nav-icon ${
                currentRoute === "/dashboard/movies" ? "active" : ""
              }`}
              src={NavMovies}
              alt="movies link"
              width="32"
              height="25"
            />
          </Link>
          <Link href="/dashboard/tv">
            <Image
              className={`nav-icon ${
                currentRoute === "/dashboard/tv" ? "active" : ""
              }`}
              src={NavTv}
              alt="tv link"
              width="32"
              height="25"
            />
          </Link>
          <Link href="/dashboard/bookmarks">
            <Image
              className={`nav-icon ${
                currentRoute === "/dashboard/bookmarks" ? "active" : ""
              }`}
              src={NavBookmark}
              alt="bookmarks link"
              width="32"
              height="25"
            />
          </Link>
        </div>
        {/* TODO: conditionally render */}

        <div className=" mr-2 mt-2 flex flex-wrap justify-center sm:mt-0 sm:mt-0  md:flex-col md:items-center">
          <div className="flex flex-wrap justify-end sm:items-center sm:justify-center md:flex-col ">
            <Image
              className="mr-4 md:mb-4 md:mr-0"
              src={Avatar}
              alt="logo"
              width="32"
              height="25"
            />
            {user && (
              <p className="mb-4 hidden p-2 text-xs sm:block">
                Welcome, {user?.firstName}
              </p>
            )}
            <button
              className="mb-4 mt-2 rounded-lg bg-red p-2 text-xs hover:bg-white hover:text-black sm:mt-0"
              onClick={handleLogout}
            >
              {" "}
              {user ? "Logout" : ""}{" "}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
