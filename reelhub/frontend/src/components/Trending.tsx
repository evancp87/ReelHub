import React from "react";
import TrendingCard from "./TrendingCard";
import { Media } from "@/store/services/types";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetTrendingMediaQuery } from "@/store/services/mediaApi";

export default function Trending() {
  const { isLoading, isFetching, data, error } = useGetTrendingMediaQuery(null);

  return (
    <div className="mb-4">
      <h3 className="my-4 text-2xl md:text-3xl">Trending</h3>
      <ul className="carousel-end carousel rounded-box mb-4 h-[200px] cursor-move gap-4 overflow-y-clip sm:h-auto">
        {error ? (
          <li className="flex w-full flex-col items-start">
            Oh no, there was an error
          </li>
        ) : isLoading || isFetching ? (
          <li className="flex w-full flex-col items-start">Loading...</li>
        ) : data ? (
          data.map((media: Media, index) => {
            const { year, title, rating, thumbnail, category, _id } = media;
            return (
              <li className="carousel-item relative">
                <TrendingCard
                  key={_id}
                  year={year}
                  category={category}
                  rating={rating}
                  title={title}
                  thumbnail={thumbnail}
                  id={_id}
                  // isBookmarked={isBookmarked}
                  // isTrending={isTrending}
                />
              </li>
            );
          })
        ) : null}
      </ul>
    </div>
  );
}
