"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "/public/assets/icon-search.svg";
import { selectSearch, searchQuery } from "@/store/services/mediaSlice";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Controls() {
  const [query, setQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);

    dispatch(searchQuery(e.target.value));
  };

  const resetQuery = () => {
    dispatch(searchQuery(""));
    console.log("i fired");
  };

  useEffect(() => {
    resetQuery();
  }, [pathname, searchParams.toString()]);

  return (
    <div className="flex w-full flex-row">
      <Image
        alt="search-icon for search bar"
        width="20"
        height="20"
        src={SearchIcon}
      />
      <input
        className="ml-4 w-full bg-transparent focus:outline-none"
        type="text"
        placeholder="Search for content"
        value={search}
        onChange={handleQuery}
      />
    </div>
  );
}
