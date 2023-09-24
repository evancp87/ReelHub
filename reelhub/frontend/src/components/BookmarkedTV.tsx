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

export default function BookmarkedTV({}: Props) {
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;
  const token = useSelector(selectCurrentToken);
  console.log("checking the user", user);
  console.log("checking the user id", user?._id);

  const { error, isLoading, isFetching, data } = useGetUserBookmarksQuery(
    userId,
    token
    // "TV Series"
  );

  return (
    <div className="my-4 w-full">
      <h3 className="mb-4 text-2xl md:text-3xl">Bookmarked TV Series</h3>
      <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {error ? (
          <li>
            <p>Oh no, there was an error</p>
          </li>
        ) : isLoading || isFetching ? (
          <li>
            <p>Loading...</p>
          </li>
        ) : data && data.length > 0 ? (
          data
            .filter((media) => media.media.category === "TV Series")
            .map((media, index) => {
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
        ) : (
          <li>
            {" "}
            <p className="py-4">Bookmarked TV series will appear here</p>
          </li>
        )}
      </ul>
    </div>
  );
}
