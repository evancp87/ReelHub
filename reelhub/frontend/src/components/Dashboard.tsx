"use client";

import React from "react";
import Trending from "./Trending";
import Recommended from "./Recommended";
import { Media } from "../store/services/types";
import { selectSearch } from "../store/services/mediaSlice";
import MediaCard from "../components/MediaCard";
import { useGetMediaQuery } from "../store/services/mediaApi";
import { useAppSelector } from "@/utils/helpers";
import { filterData } from "@/utils/helpers";
export default function Dashboard() {
  const { data } = useGetMediaQuery(null);

  const search = useAppSelector(selectSearch);
  const filteredSearch = filterData(data, search);
  
  return (
    <div className="bg-[#10141E] p-2">
      {search && (
        <p className="my-4 flex self-start">
          Found {filteredSearch.length} results for '{search}'
        </p>
      )}
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
              id={media._id}
            />
          ))}
        </ul>
      ) : (
        <>
          <Trending />
          <Recommended />
        </>
      )}
    </div>
  );
}
