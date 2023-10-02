"use client";
import React from "react";
import { RootState, AppDispatch } from "../../../store/store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { useGetMediaByCategoryQuery } from "../../../store/services/mediaApi";
import MediaCard from "../../../components/MediaCard";
import { Media } from "../../../store/services/types";
import { selectSearch } from "../../../store/services/mediaSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type Props = {};

export default function page({}: Props) {
  // api call for movies
  const { isLoading, isFetching, data, error } =
    useGetMediaByCategoryQuery("Movie");
  const search = useAppSelector(selectSearch);

  // filtered search for movie data
  const filteredSearch = data
    ? data.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  return (
    <div className="my-4 w-full">
      {search && (
        <p className="my-4 flex self-start">
          Found {filteredSearch.length} results for '{search}'
        </p>
      )}
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
    </div>
  );
}
