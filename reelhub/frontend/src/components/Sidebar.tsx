"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/utils/helpers";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { selectCurrentUser, logout } from "../store/services/usersSlice";

export default function Sidebar() {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const currentRoute = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/authentication/login");
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <aside
        suppressHydrationWarning={true}
        className=" flex h-24 flex-row items-center justify-between bg-darkBlue sm:mx-[0.5em] sm:mt-[1.5em] sm:rounded-xl md:mx-[2em] md:h-[70vh] md:w-[75px] md:max-w-[75x] md:flex-col lg:h-screen"
      >
        <Image
          className=" ml-4 mr-2 sm:mr-0 md:ml-0 md:mt-4"
          src="https://reelhub.s3.eu-west-2.amazonaws.com/logo.svg"
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
              src="https://reelhub.s3.eu-west-2.amazonaws.com/icon-nav-home.svg"
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
              src="https://reelhub.s3.eu-west-2.amazonaws.com/icon-nav-movies.svg"
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
              src="https://reelhub.s3.eu-west-2.amazonaws.com/icon-nav-tv-series.svg"
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
              src="https://reelhub.s3.eu-west-2.amazonaws.com/icon-nav-bookmark.svg"
              alt="bookmarks link"
              width="32"
              height="25"
            />
          </Link>
        </div>

        <div
          suppressHydrationWarning={true}
          className=" mr-2 mt-2 flex flex-wrap justify-center sm:mt-0 sm:mt-0  md:flex-col md:items-center"
        >
          <div
            suppressHydrationWarning={true}
            className="flex flex-wrap justify-end sm:items-center sm:justify-center md:flex-col "
          >
            {isMounted && user?.avatar ? (
              <Image
                className="mr-4 mt-2 h-[30px] w-[30px] rounded-full md:mb-4 md:mr-0"
                src={user?.avatar}
                alt="logo"
                width="32"
                height="25"
                suppressHydrationWarning={true}
              />
            ) : (
              <FontAwesomeIcon
                className="mr-4 mt-4 md:mb-4 md:mr-0"
                width="32"
                height="25"
                icon={faUser}
              />
            )}

            {isMounted && user ? (
              <p className="mb-4 hidden p-2 text-xs sm:block">
                Welcome, {user?.firstName}
              </p>
            ) : (
              ""
            )}
            <button
              className="mb-4 mt-2 rounded-lg bg-red p-2 text-xs hover:bg-white hover:text-black sm:mt-0"
              onClick={handleLogout}
            >
              {" "}
              {isMounted && user ? "Logout" : ""}{" "}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
