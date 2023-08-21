import React from "react";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import Image from "next/image";
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

export default function RecommendedCard({
  title,
  thumbnail: { trending: large },
  year,
  category,
  rating,
}: Props) {
  return (
    <>
      <div className="relative">
        <Image
          className="rounded-md"
          alt="image"
          width="400"
          height="200"
          src={Thing}
        />
        <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
          <Image width="20" height="20" alt="bookmark" src={Bookmark} />
        </div>
        <div className=" flex max-w-[70%] flex-col ">
          <div className=" my-2 flex flex-row justify-between">
            <p>{year}</p>
            <p>{category}</p>

            <Image width="20" height="10" alt="bookmark" src={Category} />
            <p>{rating}</p>
          </div>
          <h3> {title}</h3>
        </div>
      </div>
    </>
  );
}
