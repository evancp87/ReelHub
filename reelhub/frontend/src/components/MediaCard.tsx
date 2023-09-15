import React, { useEffect } from "react";
// import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
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
      <div className="relative">
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
            alt="image"
            className="rounded-md"
            width="400"
            height="200"
            src={regularLarge?.valueOf() || ""}
          />
        </picture>

        <div className="absolute right-0 top-0 mr-[1em] mt-[1em] cursor-pointer rounded-full bg-gray-700 p-3 opacity-60 hover:bg-white">
          <Image
            width="20"
            height="20"
            alt="bookmark"
            className={`hover:brightness-[.95] hover:contrast-[1.05] hover:hue-rotate-[293deg] hover:invert-[0] hover:saturate-[0] hover:sepia-[.04]
            ${!bookmarked ? "" : "bg-white"}`}
            src={Bookmark}
            onClick={handleBookmarkInteraction}
          />
        </div>
        <div className=" flex max-w-[70%] flex-col ">
          <div className=" my-2 flex flex-row justify-between">
            <p className="text-xs">{year.toString()}</p>

            <Image
              width="20"
              height="10"
              alt="bookmark"
              src={category === "TV Series" ? tvCategory : movieCategory}
            />
            <p className="text-xs">{category}</p>
            <p className="text-xs">{rating}</p>
          </div>
          <h3 className="text-lg"> {title}</h3>
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
