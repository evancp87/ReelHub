import React, { useEffect } from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import movieCategory from "/public/assets/icon-category-movie.svg";
import tvCategory from "/public/assets/icon-category-tv.svg";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { selectCurrentUser } from "@/store/services/usersSlice";
import Play from "/public/assets/icon-play.svg";
import EmptyBookmark from "/public/assets/icon-bookmark-empty.svg";
import FullBookmark from "/public/assets/icon-bookmark-full.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetUserBookmarksQuery,
  useAddBookmarkMutation,
} from "@/store/services/bookmarksApi";
type Props = {
  title: string;
  thumbnail?: {
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
  id: string;
};

export default function TrendingCard({
  title,
  thumbnail,
  year,
  category,
  rating,
  isBookmarked,
  isTrending,
  id,
}: Props) {
  const trendingSmall = thumbnail?.trending?.small;
  const trendingLarge = thumbnail?.trending?.large;
  const regularSmall = thumbnail?.regular.small;
  const regularMedium = thumbnail?.regular.medium;
  const regularLarge = thumbnail?.regular.large;

  const notifySuccessAdd = () => toast("Your bookmark was saved");
  const notifySuccessRemoved = () => toast("Your bookmark was removed");
  const notifyError = () => toast("Your bookmark could not be saved");

  const user = useSelector(selectCurrentUser);
  const { data: userBookmarks, refetch } = useGetUserBookmarksQuery(user?._id);
  console.log("checking usr bookmarkas", userBookmarks);

  const bookmarked = userBookmarks?.some(
    (bookmark) => bookmark.media._id === id
  );
  useEffect(() => {
    console.log("new bookmarks", userBookmarks);
  }, [userBookmarks]);
  console.log(bookmarked);

  const mediaId = id;
  const [addBookmark] = useAddBookmarkMutation();

  const handleBookmarkInteraction = async () => {
    try {
      // If not bookmarked, add it
      // await addBookmarkMutation({ id });
      console.log("checking the media id again", mediaId);
      if (bookmarked) {
        await addBookmark({ mediaId, userId: user._id });
        refetch();
        notifySuccessRemoved();
      } else {
        await addBookmark({ mediaId, userId: user._id });
        refetch();
        notifySuccessAdd();
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <>
      <div className="hover-overlay img-container">
        <picture>
          <source
            media="(max-width: 500px)"
            srcSet={trendingSmall?.valueOf() || ""}
          />
          <Image
            alt={`${title} image`}
            className="rounded-md"
            width="400"
            height="200"
            src={trendingLarge?.valueOf() || ""}
          />
        </picture>
        <div className="play-icon flex hidden gap-1.5 rounded-3xl bg-slate-300 bg-opacity-60 px-8 py-2">
          <Image
            width="20"
            height="20"
            alt="play button"
            className="opacity-100 "
            src={Play}
          />
          <p className="opacity-100 ">Play</p>
        </div>
      </div>
      <div className="bookmark-container absolute right-0 top-0 mr-[1em] mt-[1em] cursor-pointer rounded-full bg-gray-700 p-3 opacity-60 hover:bg-white">
        <Image
          width="10"
          height="10"
          alt="bookmark"
          className="filtered-bookmark"
          // className={`${!bookmarked ? "" : "bg-white"}`}
          src={bookmarked ? FullBookmark : EmptyBookmark}
          onClick={handleBookmarkInteraction}
        />
      </div>
      <div className=" absolute bottom-0 left-0 mb-4 ms-4 flex w-[50%] flex-col">
        <div className="mb-2 flex flex-row items-center justify-between">
          <p className="text-xs sm:text-sm">
            {year.toString()} <span className="text-xs">●</span>
          </p>
          <div>
            <Image
              width="20"
              height="10"
              alt={category === "TV Series" ? "tv category" : "movie category"}
              src={category === "TV Series" ? tvCategory : movieCategory}
            />
          </div>
          <p className="text-xs sm:text-sm">
            {category} <span className="text-xs">●</span>
          </p>

          <p className="text-xs sm:text-sm">{rating} </p>
        </div>
        <h3 className=" whitespace-nowrap text-xs sm:text-base md:text-2xl">
          {title}
        </h3>
      </div>
    </>
  );
}
