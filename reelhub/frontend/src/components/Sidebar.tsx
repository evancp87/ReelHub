import React from "react";
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

import Play from "../../public/assets/icon-play.svg";
import Search from "../../public/assets/icon-search.svg";
import Avatar from "../../public/assets/image-avatar.png";
import Link from "next/link";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <aside className=" flex h-24 flex-row items-center justify-between bg-darkBlue sm:mx-[0.5em] sm:mt-[1.5em] sm:rounded-xl md:mx-[2em] md:h-[70vh] md:w-[200px] md:max-w-[200px] md:flex-col">
      <Image
        className=" ml-4 md:ml-0 md:mt-4"
        src={Logo}
        alt="logo"
        width="32"
        height="25"
      />
      <div className="flex flex-row gap-4 md:flex-col">
        <Link href="/movies">
          <Image src={NavMovies} alt="logo" width="32" height="25" />
        </Link>
        <Link href="/">
          <Image src={NavHome} alt="logo" width="32" height="25" />
        </Link>
        <Link href="/bookmarks">
          <Image src={NavBookmark} alt="logo" width="32" height="25" />
        </Link>
        <Link href="/tv">
          <Image src={NavTv} alt="logo" width="32" height="25" />
        </Link>
      </div>
      <Image
        className="mr-4 md:mb-4 md:mr-0"
        src={Avatar}
        alt="logo"
        width="32"
        height="25"
      />
    </aside>
  );
}
