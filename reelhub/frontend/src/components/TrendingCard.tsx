import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import movieCategory from "/public/assets/icon-category-movie.svg";
import tvCategory from "/public/assets/icon-category-tv.svg";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Five-line loading skeleton
type Props = {
  title: string;
  thumbnail?: {
    trending?: {
      small: String;
      large: String;
    };
    regular: {
      small: String;
      medium: String;
      large: String;
    };
  };
  year: Number;
  category: String;
  rating: String;
  isBookmarked: Boolean;
  isTrending: Boolean;
};

export default function TrendingCard({
  title,
  thumbnail,
  year,
  category,
  rating,
  isBookmarked,
  isTrending,
}: Props) {
  const trendingSmall = thumbnail?.trending?.small;
  const trendingLarge = thumbnail?.trending?.large;
  const regularSmall = thumbnail?.regular.small;
  const regularMedium = thumbnail?.regular.medium;
  const regularLarge = thumbnail?.regular.large;

  return (
    <div className="carousel-item relative">
      <picture>
        <source
          media="(max-width: 500px)"
          srcSet={trendingSmall?.valueOf() || ""}
        />
        <Image
          alt="image"
          className="rounded-md"
          width="400"
          height="200"
          src={trendingLarge?.valueOf() || ""}
        />
      </picture>
      <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
        <Image width="20" height="20" alt="bookmark" src={Bookmark} />
      </div>
      <div className=" absolute bottom-0 left-0 mb-4 ms-4 flex w-[50%] flex-col">
        <div className="mb-2 flex flex-row items-center justify-between">
          <p>
            {year.toString()} <span className="text-xs">●</span>
          </p>
          <div>
            <Image
              width="20"
              height="10"
              alt="bookmark"
              src={category === "TV Series" ? tvCategory : movieCategory}
            />
          </div>
          <p>
            {category} <span className="text-xs">●</span>
          </p>

          <p>{rating} </p>
        </div>
        <h3 className="text-xs md:text-2xl">{title}</h3>
      </div>
    </div>
  );
}
