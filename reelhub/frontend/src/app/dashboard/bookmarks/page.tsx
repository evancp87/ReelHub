"use client";
import React from "react";
import BookmarkedMovies from "@/components/BookmarkedMovies";
import BookmarkedTV from "@/components/BookmarkedTV";
import { useAppSelector } from "@/utils/helpers";
import { selectCurrentUser } from "@/store/services/usersSlice";
import { useGetUserBookmarksQuery } from "@/store/services/bookmarksApi";
import { selectSearch } from "@/store/services/mediaSlice";
import MediaCard from "@/components/MediaCard";

export default function page() {
  const search = useAppSelector(selectSearch);
  const user: any = useAppSelector(selectCurrentUser);

  const userId = user?._id;

  const { data } = useGetUserBookmarksQuery(userId);

  // filtered search for bookmarks page
  const filteredSearch = data
    ? data.filter((data) =>
        data.media.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="contents">
      {search && (
        <p className="my-4 flex self-start">
          Found {filteredSearch.length} results for '{search}'
        </p>
      )}
      {search ? (
        <>
          <ul className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {filteredSearch.map((bookmark) => (
              <MediaCard
                key={bookmark.media._id}
                title={bookmark.media.title}
                thumbnail={bookmark.media.thumbnail}
                year={bookmark.media.year}
                category={bookmark.media.category}
                rating={bookmark.media.rating}
                isBookmarked={bookmark.media.isBookmarked}
                isTrending={bookmark.media.isTrending}
                id={bookmark.media._id}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <BookmarkedMovies />
          <BookmarkedTV />
        </>
      )}
    </div>
  );
}
