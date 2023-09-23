import React, { useEffect, useState } from "react";
// import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import EmptyBookmark from "/public/assets/icon-bookmark-empty.svg";
import FullBookmark from "/public/assets/icon-bookmark-full.svg";

import Play from "/public/assets/icon-play.svg";
import Image from "next/image";
import movieCategory from "/public/assets/icon-category-movie.svg";
import tvCategory from "/public/assets/icon-category-tv.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {
  useAddBookmarkMutation,
  useDeleteMediaMutation,
  useGetUserBookmarksQuery,
} from "../store/services/bookmarksApi";

import { selectCurrentUser } from "@/store/services/usersSlice";

// https://github.com/dvtng/react-loading-skeleton

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
  const regularSmall = thumbnail?.regular?.small;
  const regularMedium = thumbnail?.regular?.medium;
  const regularLarge = thumbnail?.regular?.large;
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
  const [deleteMedia] = useDeleteMediaMutation();
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };
  // const { data: addBookmark } = useAddBookmarkMutation();
  // const { data: deleteMedia } = useDeleteMediaMutation();

  // const handleBookmarkInteraction = async () => {
  //   if (bookmarked) {
  //     // If already bookmarked, remove it
  //     // await deleteMediaMutation.mutateAsync(id);

  //     try {
  //       console.log("checking the media id", mediaId);
  //       await deleteMedia({ mediaId, userId: user._id });
  //     } catch (error) {
  //       console.log("error:", error);
  //     }
  //   } else {
  //     try {
  //       // If not bookmarked, add it
  //       // await addBookmarkMutation({ id });
  //       console.log("checking the media id again", mediaId);

  //       await addBookmark({ mediaId, userId: user._id });
  //     } catch (error) {
  //       console.error("error:", error);
  //     }
  //   }
  // };

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

  const categories = {
    movie: "Movie",
    tv: "TV Series",
  };

  return (
    <>
      <div className=" ">
        <div className="hover-overlay img-container relative">
          <picture className=" ">
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
                src={Play}
              />
              <p className="opacity-100 ">Play</p>
            </div>
            <div className="bookmark-container absolute right-0 top-0 mr-[1em] mt-[1em] cursor-pointer rounded-full bg-gray-700 p-3 opacity-60 hover:bg-white min-[1850px]:right-[50px] min-[2000px]:right-[100px] min-[2000px]:top-[-10px]">
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
          </picture>
        </div>
        <div className=" flex max-w-[90%] flex-col lg:max-w-[70%] ">
          <div className=" my-2 flex flex-row justify-between">
            <p className="text-xs">{year.toString()}</p>
            <div className="ml-2 flex flex-wrap gap-[0.3em]">
              <Image
                width="10"
                height="5"
                alt={category === "TV Series" ? "TV Icon" : "Movie Icon"}
                src={category === "TV Series" ? tvCategory : movieCategory}
              />
              <p className="text-xs">{category}</p>
            </div>
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
          {/* Same as */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
