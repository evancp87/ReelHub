"use client";

import React from "react";
import { RootState, AppDispatch } from "../store/store";
import MediaCard from "../components/MediaCard";
import { Media } from "../store/services/types";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// import Image from "next/image";
// import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
// import Bookmark from "/public/assets/icon-bookmark-empty.svg";
// import Category from "/public/assets/icon-category-movie.svg";
import { useGetMediaByCategoryQuery } from "../store/services/mediaApi";
import { ReduxProvider } from "./ReduxProvider";
import { selectSearch } from "@/store/services/mediaSlice";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type Props = {};

export default function page({}: Props) {
  const { isLoading, isFetching, data, error } =
    useGetMediaByCategoryQuery("TV Series");
  console.log(error);

  const search = useAppSelector(selectSearch);

  const filteredSearch = data
    ? data.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <ReduxProvider>
      {filteredSearch.length === 0 && <p>No TV Series found</p>}

      <div className="my-4">
        <h3 className="mb-4 text-xl">Tv Series</h3>
        <div className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {search ? (
            filteredSearch.map((media: Media) => (
              <MediaCard
                title={media.title}
                thumbnail={media.thumbnail}
                year={media.year}
                category={media.category}
                rating={media.rating}
                isBookmarked={media.isBookmarked}
                isTrending={media.isTrending}
              />
            ))
          ) : (
            <>
              {error ? (
                <p>Oh no, there was an error</p>
              ) : isLoading || isFetching ? (
                <p>Loading...</p>
              ) : data ? (
                data.map((media, index) => {
                  const { year, title, rating, thumbnail, category } = media;
                  return (
                    <div className="carousel-item relative">
                      <MediaCard
                        key={index}
                        year={year}
                        category={category}
                        rating={rating}
                        title={title}
                        thumbnail={thumbnail}
                      />
                    </div>
                  );
                })
              ) : null}
            </>
          )}
        </div>
      </div>
    </ReduxProvider>
  );
}
