import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Category from "/public/assets/icon-category-movie.svg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import MediaCard from "./MediaCard";
import { ReduxProvider } from "./ReduxProvider";

import { useGetMediaQuery } from "@/store/services/mediaApi";
type Props = {};

export default function Recommended({}: Props) {
  const { isLoading, isFetching, data, error } = useGetMediaQuery(null);

  return (
    // <ReduxProvider>
    <div className="mb-4 ">
      <h3 className="mb-4 text-2xl md:text-3xl">Recommended for you</h3>
      <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {error ? (
          <li>Oh no, there was an error</li>
        ) : isLoading || isFetching ? (
          <li>Loading...</li>
        ) : data ? (
          data.map((media, index) => {
            const { year, title, rating, thumbnail, category, _id } = media;
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
              />
            );
          })
        ) : null}
      </ul>
    </div>
    // </ReduxProvider>
  );
}
