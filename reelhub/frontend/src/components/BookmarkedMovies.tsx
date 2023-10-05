import React from "react";
import MediaCard from "./MediaCard";
import { useAppSelector } from "@/utils/helpers";
import { selectCurrentUser } from "@/store/services/usersSlice";
import { useGetUserBookmarksQuery } from "@/store/services/bookmarksApi";

export default function BookmarkedMovies() {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?._id;

  const { error, isLoading, isFetching, data } = useGetUserBookmarksQuery(
    userId
    // token: token,
    // "Movie"
  );
  return (
    <div className="my-4 w-full ">
      <h3 className="mb-4 text-2xl md:text-3xl">Bookmarked Movies</h3>
      <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {error ? (
          <li>
            {" "}
            <p>Oh no, there was an error</p>
          </li>
        ) : isLoading || isFetching ? (
          <li>
            {" "}
            <p>Loading...</p>
          </li>
        ) : data && data.length > 0 ? (
          data
            .filter((media) => media.media.category === "Movie")
            .map((media, index) => {
              const {
                year,
                title,
                rating,
                thumbnail,
                category,
                _id,
                isBookmarked,
                isTrending,
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
            <p className="py-4">Bookmarked movies will appear here</p>
          </li>
        )}
      </ul>
    </div>
  );
}
