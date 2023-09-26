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
      {/* {filteredSearch.length === 0 && <p>No TV Series found</p>} */}

      {search && (
        <p className="mt-4 flex self-start">
          Found {filteredSearch.length} results for '{search}'
        </p>
      )}
      <div className="my-4 w-full">
        {search ? (
          <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {filteredSearch.map((media: Media) => (
              <MediaCard
                key={media._id}
                title={media.title}
                thumbnail={media.thumbnail}
                year={media.year}
                category={media.category}
                rating={media.rating}
                isBookmarked={media.isBookmarked}
                isTrending={media.isTrending}
              />
            ))}
          </ul>
        ) : (
          <>
            {error ? (
              <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
              <p>Loading...</p>
            ) : data ? (
              <>
                <h3 className="mb-4 text-2xl md:text-3xl">TV Series</h3>

                <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {data.map((media, index) => {
                    const { year, title, rating, thumbnail, category, _id } =
                      media;
                    return (
                      <div className="carousel-item relative">
                        <MediaCard
                          key={_id}
                          year={year}
                          category={category}
                          rating={rating}
                          title={title}
                          thumbnail={thumbnail}
                          id={_id}
                        />
                      </div>
                    );
                  })}
                </ul>
              </>
            ) : null}
          </>
        )}
      </div>
    </ReduxProvider>
  );
}
