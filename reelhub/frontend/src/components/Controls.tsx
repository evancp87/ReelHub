"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { selectSearch, searchQuery } from "@/store/services/mediaSlice";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/helpers";

export default function Controls() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // dispatches search to store
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(searchQuery(e.target.value));
  };

  // resets query on change of path
  const resetQuery = () => {
    dispatch(searchQuery(""));
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
        src="https://reelhub.s3.eu-west-2.amazonaws.com/icon-search.svg"
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
