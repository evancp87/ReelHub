import React from "react";
import BookmarkedMovies from "@/components/BookmarkedMovies";
import BookmarkedTV from "@/components/BookmarkedTV";
import { ReduxProvider } from "@/components/ReduxProvider";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <ReduxProvider>
        <BookmarkedMovies />
        <BookmarkedTV />
      </ReduxProvider>
    </div>
  );
}
