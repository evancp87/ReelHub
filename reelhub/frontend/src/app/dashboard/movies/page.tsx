"use client";
import React from "react";
import { RootState, AppDispatch } from "../../../store/store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import Category from "/public/assets/icon-category-movie.svg";
import { useGetMediaByCategoryQuery } from "../../../store/services/mediaApi";
import MediaCard from "../../../components/MediaCard";
// import { Media } from "@/store/services/types";
import { Media } from "../../../store/services/types";

// import { ReduxProvider } from "@/components/ReduxProvider";
import { ReduxProvider } from "../../../components/ReduxProvider";
// import { selectSearch } from "@/store/services/mediaSlice";
import { selectSearch } from "../../../store/services/mediaSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type Props = {};

export default function page({}: Props) {
  const { isLoading, isFetching, data, error } =
    useGetMediaByCategoryQuery("Movie");
  const search = useAppSelector(selectSearch);

  const filteredSearch = data
    ? data.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  return (
    // <ReduxProvider>
    <div className="my-4 w-full">
      {search && (
        <p className="my-4 flex self-start">
          Found {filteredSearch.length} results for '{search}'
        </p>
      )}
      {/* {filteredSearch.length === 0 && <p>No movies found</p>} */}
      {search ? (
        <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredSearch.map((media: Media) => (
            <MediaCard
              key={_id}
              title={media.title}
              thumbnail={media.thumbnail}
              year={media.year}
              category={media.category}
              rating={media.rating}
              isBookmarked={media.isBookmarked}
              isTrending={media.isTrending}
              id={_id}
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
              <h3 className="mb-4 text-2xl md:text-3xl">Movies</h3>
              <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {data.map((media, index) => {
                  const { year, title, rating, thumbnail, category, _id } =
                    media;
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
                })}
              </ul>
            </>
          ) : null}
        </>
      )}
      {/* </div> */}
    </div>
  );
}
