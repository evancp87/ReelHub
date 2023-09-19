"use client";

import React from "react";
import Trending from "./Trending";
import Recommended from "./Recommended";
import { Media } from "../store/services/types";
import Controls from "./Controls";
import type { TypedUseSelectorHook } from "react-redux";
import { selectSearch } from "../store/services/mediaSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../components/MediaCard";
import { useGetMediaQuery } from "../store/services/mediaApi";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { ReduxProvider } from "./ReduxProvider";
type Props = {};

export default function Dashboard({}: Props) {
  const { isLoading, isFetching, data, error } = useGetMediaQuery(null);

  const search = useAppSelector(selectSearch);

  const filteredSearch = data
    ? data.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    // <>
    //   <Trending />
    //   <Recommended />
    // </>
    // <ReduxProvider>
    <div className="bg-[#10141E]">
      <p className="mt-4 flex self-start">
        {search && `Found ${filteredSearch.length} results for ${search}`}
      </p>
      {search ? (
        <div className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredSearch.map((media: Media) => (
            <MediaCard
              title={media.title}
              thumbnail={media.thumbnail}
              year={media.year}
              category={media.category}
              rating={media.rating}
              isBookmarked={media.isBookmarked}
              isTrending={media.isTrending}
              id={media._id}
            />
          ))}
        </div>
      ) : (
        <>
          <Trending />
          <Recommended />
        </>
      )}
    </div>
    // </ReduxProvider>
  );
}
