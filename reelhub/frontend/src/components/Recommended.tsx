// "use client"
import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Category from "/public/assets/icon-category-movie.svg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
type Props = {};

export default function Recommended({}: Props) {
  return (
    <div className="mb-4">
      <h3 className="mb-4 text-xl">Recommended for you</h3>
      <div className="grid grid-cols-2 gap-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="relative">
          <Image
            className="rounded-md"
            alt="image"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" flex max-w-[70%] flex-col ">
            <div className=" my-2 flex flex-row justify-between">
              <p>2019</p>

              <Image width="20" height="10" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
