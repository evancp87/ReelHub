"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "/public/assets/icon-search.svg";
import { selectSearch, search } from "@/features/mediaSlice";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Controls() {
  const [query, setQuery] = useState<string>("");
  // const dispatch = useAppDispatch();
  // const search = useAppSelector(selectSearch);

  // const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   console.log(e.target.value);

  //   dispatch(search(e.target.value));
  // };

  return (
    <div className="flex w-full flex-row">
      <Image
        alt="search-icon for search bar"
        width="20"
        height="20"
        src={SearchIcon}
      />
      <input
        className="ml-4 w-full bg-transparent"
        type="text"
        placeholder="Search for movies or Tv series"
        // value={search}
        // onChange={handleQuery}
      />
    </div>
  );
}
