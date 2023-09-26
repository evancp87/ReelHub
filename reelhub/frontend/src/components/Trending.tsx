import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import Category from "/public/assets/icon-category-movie.svg";
import TrendingCard from "./TrendingCard";
import { ReduxProvider } from "./ReduxProvider";
import { Media } from "../store/services/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type Props = {};

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useGetTrendingMediaQuery } from "../store/services/mediaApi";
export default function Trending({}: Props) {
  const { isLoading, isFetching, data, error } = useGetTrendingMediaQuery(null);
  console.log(isLoading, isFetching, data, error);

  return (
    // <ReduxProvider>
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
    // </ReduxProvider>
  );
}
