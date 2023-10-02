"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import NavBookmark from "../../public/assets/icon-nav-bookmark.svg";
import NavHome from "../../public/assets/icon-nav-home.svg";
import NavTv from "../../public/assets/icon-nav-tv-series.svg";
import NavMovies from "../../public/assets/icon-nav-movies.svg";
import Link from "next/link";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

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

  const router = useRouter();
  const currentRoute = usePathname();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/authentication/login");
  };

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

        <div className=" mr-2 mt-2 flex flex-wrap justify-center sm:mt-0 sm:mt-0  md:flex-col md:items-center">
          <div className="flex flex-wrap justify-end sm:items-center sm:justify-center md:flex-col ">
            {user?.avatar ? (
              <Image
                className="mr-4 mt-2 h-[30px] w-[30px] rounded-full md:mb-4 md:mr-0"
                src={user?.avatar}
                alt="logo"
                width="32"
                height="25"
              />
            ) : (
              <FontAwesomeIcon
                className="mr-4 mt-4 md:mb-4 md:mr-0"
                width="32"
                height="25"
                icon={faUser}
              />
            )}

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
