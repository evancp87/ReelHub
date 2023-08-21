import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import Category from "/public/assets/icon-category-movie.svg";

type Props = {
  title: string;
  thumbnail: {
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
  thumbnail: { trending: large },
  year,
  category,
  rating,
}: Props) {
  return (
    <div className="carousel-item relative">
      <Image
        alt="image"
        className="rounded-md"
        width="400"
        height="200"
        src={large}
      />
      <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
        <Image width="20" height="20" alt="bookmark" src={Bookmark} />
      </div>
      <div className=" absolute bottom-0 left-0 mb-4 ms-4 flex w-[50%] flex-col">
        <div className="mb-2 flex flex-row items-center justify-between">
          <p>
            {year.toString()} <span className="text-xs">●</span>
          </p>
          <div>
            <Image width="20" height="10" alt="bookmark" src={Category} />
          </div>
          <p>
            {category} <span className="text-xs">●</span>
          </p>

          <p>{rating} </p>
        </div>
        <h3>{title}</h3>
      </div>
    </div>
  );
}
