import React from "react";
import MediaCard from "./MediaCard";

import { useGetMediaQuery } from "@/store/services/mediaApi";

export default function Recommended() {
  const { isLoading, isFetching, data, error } = useGetMediaQuery(null);
  // for recommended section
  return (
    <div className="mb-4 ">
      <h3 className="mb-4 text-2xl md:text-3xl">Recommended for you</h3>
      <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {error ? (
          <li>Oh no, there was an error</li>
        ) : isLoading || isFetching ? (
          <li>Loading...</li>
        ) : data ? (
          data.map((media, index) => {
            const {
              year,
              title,
              rating,
              thumbnail,
              category,
              _id,
              isBookmarked,
              isTrending,
            } = media;
            console.log(thumbnail?.regular.large);
            return (
              <MediaCard
                key={_id}
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
        ) : null}
      </ul>
    </div>
  );
}
