import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {
  useAddBookmarkMutation,
  useGetUserBookmarksQuery,
} from "../store/services/bookmarksApi";

import { selectCurrentUser } from "@/store/services/usersSlice";

type Props = {
  title: string;
  thumbnail?: {
    trending?: {
      small: String;
      large: String;
    };
    regular?: {
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

export default function RecommendedCard({
  title,
  thumbnail,
  year,
  category,
  rating,
  isBookmarked,
  isTrending,
  id,
}: Props) {
  // defines different sizes of thumbnails for different viewports
  const regularSmall = thumbnail?.regular?.small;
  const regularMedium = thumbnail?.regular?.medium;
  const regularLarge = thumbnail?.regular?.large;

  const notifySuccessAdd = () => toast("Your bookmark was saved");
  const notifySuccessRemoved = () => toast("Your bookmark was removed");

  const user = useSelector(selectCurrentUser);
  // fetches and refetches userBookmarks
  const { data: userBookmarks, refetch } = useGetUserBookmarksQuery(user?._id);

  // finds the media items that are already bookmarked
  const bookmarked = userBookmarks?.some(
    (bookmark) => bookmark.media._id === id
  );
  useEffect(() => {
    console.log("new bookmarks", userBookmarks);
  }, [userBookmarks]);

  const mediaId = id;
  const [addBookmark] = useAddBookmarkMutation();

  const handleBookmarkInteraction = async () => {
    try {
      // If not bookmarked, add it, otherwise remove it from db
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
    <li>
      <div className="hover-overlay img-container relative">
        <picture>
          <source
            media="(max-width: 500px)"
            srcSet={regularSmall?.valueOf() || ""}
          />
          <source
            media="(max-width: 800px)"
            srcSet={regularMedium?.valueOf() || ""}
          />
          <Image
            alt={`${title} cover`}
            className="rounded-md"
            width="400"
            height="200"
            src={regularLarge?.valueOf() || ""}
          />
          <div className="play-icon flex hidden gap-1.5 rounded-3xl bg-slate-300 bg-opacity-60 px-8 py-2">
            <Image
              width="20"
              height="20"
              alt="play button"
              className="opacity-100 "
              src="https://reelhub.s3.eu-west-2.amazonaws.com/icon-play.svg"
            />
            <p className="opacity-100 ">Play</p>
          </div>
          <div className="bookmark-container absolute right-0 top-0 mr-[1em] mt-[1em] cursor-pointer rounded-full bg-gray-700 p-3 opacity-60 hover:bg-white min-[1850px]:right-[50px] min-[2000px]:right-[100px] min-[2000px]:top-[-10px]">
            <Image
              width="10"
              height="10"
              alt="bookmark"
              className="filtered-bookmark"
              src={
                bookmarked
                  ? "https://reelhub.s3.eu-west-2.amazonaws.com/icon-bookmark-full.svg"
                  : "https://reelhub.s3.eu-west-2.amazonaws.com/icon-bookmark-empty.svg"
              }
              onClick={handleBookmarkInteraction}
            />
          </div>
        </picture>
      </div>
      <div className=" flex max-w-[90%] flex-col lg:max-w-[70%] ">
        <div className=" my-2 flex flex-row justify-between">
          <p className="text-xs">{year.toString()}</p>
          <span className="hidden text-xs sm:block">·</span>
          <div className="ml-2 flex flex-wrap gap-[0.8em]">
            <Image
              width="10"
              height="5"
              alt={category === "TV Series" ? "TV Icon" : "Movie Icon"}
              src={
                category === "TV Series"
                  ? "https://reelhub.s3.eu-west-2.amazonaws.com/icon-category-tv.svg"
                  : "https://reelhub.s3.eu-west-2.amazonaws.com/icon-category-movie.svg"
              }
            />
            <p className="text-xs">{category}</p>
          </div>
          <span className="hidden text-xs sm:block">·</span>
          <p className="text-xs">{rating}</p>
        </div>
        <h3 className="text-sm lg:text-lg"> {title}</h3>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
    </li>
  );
}
