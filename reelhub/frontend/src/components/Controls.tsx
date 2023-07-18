"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "/public/assets/icon-search.svg";

type Props = {};

export default function Controls({}: Props) {
  const [query, setQuery] = useState<string>("");

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    console.log(value);

    setQuery(value);
  };

  return (
    <div className="flex w-full flex-row">
      <Image alt="search-icon" width="20" height="20" src={SearchIcon} />
      <input
        className="ml-4 w-full bg-transparent"
        type="text"
        placeholder="Search for movies or Tv series"
        value={query}
        onChange={handleQuery}
      />
    </div>
  );
}
