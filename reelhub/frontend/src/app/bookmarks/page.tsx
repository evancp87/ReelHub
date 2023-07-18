import React from "react";
import BookmarkedMovies from "@/components/BookmarkedMovies";
import BookmarkedTV from "@/components/BookmarkedTV";
type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <BookmarkedMovies />
      <BookmarkedTV />
    </div>
  );
}
