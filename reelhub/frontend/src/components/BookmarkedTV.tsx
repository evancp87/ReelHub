import React from "react";
import MediaCard from "./MediaCard";
import { useAppSelector } from "@/utils/helpers";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "@/store/services/usersSlice";
import { useGetUserBookmarksQuery } from "../store/services/bookmarksApi";

export default function BookmarkedTV() {
  const user: any = useAppSelector(selectCurrentUser);
  const userId = user?._id!;
  const token = useAppSelector(selectCurrentToken);

  const { error, isLoading, isFetching, data } =
    useGetUserBookmarksQuery(userId);

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
              const {
                year,
                title,
                rating,
                thumbnail,
                category,
                _id,
                isTrending,
                isBookmarked,
              } = media.media;
              return (
                <MediaCard
                  key={index}
                  year={year}
                  category={category}
                  rating={rating}
                  title={title}
                  thumbnail={thumbnail}
                  id={_id}
                  isBookmarked={isBookmarked}
                  isTrending={isTrending}
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
