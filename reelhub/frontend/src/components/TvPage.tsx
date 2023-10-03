"use client";

import React from "react";
import MediaCard from "@/components/MediaCard";
import { Media } from "@/store/services/types";
import { useGetMediaByCategoryQuery } from "@/store/services/mediaApi";
import { selectSearch } from "@/store/services/mediaSlice";
import { useAppSelector } from "@/utils/helpers";
import { filterData } from "@/utils/helpers";
export default function page() {
  const { isLoading, isFetching, data, error } =
    useGetMediaByCategoryQuery("TV Series");

  const search = useAppSelector(selectSearch);
  const filteredSearch = filterData(data, search);

  return (
    <div className="self-start">
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
    </div>
  );
}
