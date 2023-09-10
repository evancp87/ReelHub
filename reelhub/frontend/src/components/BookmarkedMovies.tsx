import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Category from "/public/assets/icon-category-movie.svg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import MediaCard from "./MediaCard";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import {
  selectCurrentUser,
  selectCurrentToken,
} from "@/store/services/usersSlice";
import {
  useGetUserBookmarksQuery,
  useGetUserBookmarksByCategoryQuery,
  useAddBookmarkMutation,
  useDeleteMediaMutation,
} from "../store/services/bookmarksApi";
type Props = {};

export default function BookmarkedMovies({}: Props) {
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;

  const { error, isLoading, isFetching, data } = useGetUserBookmarksQuery(
    userId,
    // token: token,
    "Movie"
  );
  console.log("the bookmark data is", data);
  return (
    <div className="my-4">
      <h3 className="mb-4 text-xl">Bookmarked Movies</h3>
      <div className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {error ? (
          <p>Oh no, there was an error</p>
        ) : isLoading || isFetching ? (
          <p>Loading...</p>
        ) : data ? (
          data.map((media, index) => {
            const { year, title, rating, thumbnail, category, _id } =
              media.media;
            return (
              <MediaCard
                key={index}
                year={year}
                category={category}
                rating={rating}
                title={title}
                thumbnail={thumbnail}
                id={_id}
              />
            );
          })
        ) : null}
      </div>
    </div>
  );
}
