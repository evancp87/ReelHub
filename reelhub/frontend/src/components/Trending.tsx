import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import Category from "/public/assets/icon-category-movie.svg";
import TrendingCard from "./TrendingCard";
import { ReduxProvider } from "./ReduxProvider";
import { Media } from "../store/services/types";
type Props = {};
import { useGetTrendingMediaQuery } from "../store/services/mediaApi";
export default function Trending({}: Props) {
  const { isLoading, isFetching, data, error } = useGetTrendingMediaQuery(null);
  console.log(isLoading, isFetching, data, error);

  return (
    <ReduxProvider>
      <div className="mb-4">
        <h3 className="my-4 text-xl">Trending</h3>
        <div className="carousel-end carousel rounded-box mb-4 gap-4">
          {error ? (
            <p>Oh no, there was an error</p>
          ) : isLoading || isFetching ? (
            <p>Loading...</p>
          ) : data ? (
            data.map((media: Media, index) => {
              const { year, title, rating, thumbnail, category } = media;
              return (
                <div className="carousel-item relative">
                  <TrendingCard
                    key={index}
                    year={year}
                    category={category}
                    rating={rating}
                    title={title}
                    thumbnail={thumbnail}
                    // isBookmarked={isBookmarked}
                    // isTrending={isTrending}
                  />
                </div>
              );
            })
          ) : null}
        </div>
      </div>
    </ReduxProvider>
  );
}
