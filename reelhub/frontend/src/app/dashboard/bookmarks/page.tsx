"use client";
import React from "react";
import BookmarkedMovies from "@/components/BookmarkedMovies";
import BookmarkedTV from "@/components/BookmarkedTV";
// import { ReduxProvider } from "@/components/ReduxProvider";
import { ReduxProvider } from "../../../components/ReduxProvider";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { selectCurrentUser } from "@/store/services/usersSlice";
import { useGetUserBookmarksQuery } from "@/store/services/bookmarksApi";
import { selectSearch } from "@/store/services/mediaSlice";
import MediaCard from "../../../components/MediaCard";
import { Media } from "../../../store/services/types";
type Props = {};

export default function page({}: Props) {
  const search = useSelector(selectSearch);
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;

  const { error, isLoading, isFetching, data } = useGetUserBookmarksQuery(
    userId
    // token: token,
    // "Movie"
  );
  console.log("the seartch data is", data);
  const filteredSearch = data
    ? data.filter((data) =>
        data.media.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="contents">
      {/* <ReduxProvider> */}
      {search && (
        <p className="my-4 flex self-start">
          Found {filteredSearch.length} results for '{search}'
        </p>
      )}
      {search ? (
        <>
          <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {filteredSearch.map((bookmark) => (
              <MediaCard
                title={bookmark.media.title}
                thumbnail={bookmark.media.thumbnail}
                year={bookmark.media.year}
                category={bookmark.media.category}
                rating={bookmark.media.rating}
                isBookmarked={bookmark.media.isBookmarked}
                isTrending={bookmark.media.isTrending}
                id={bookmark.media._id}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <BookmarkedMovies />
          <BookmarkedTV />
        </>
      )}
      {/* </ReduxProvider> */}
    </div>
  );
}
