import React from "react";
import Image from "next/image";
import Thing from "/public/assets/thumbnails/autosport-the-series/regular/large.jpg";
import Bookmark from "/public/assets/icon-bookmark-empty.svg";
import Category from "/public/assets/icon-category-movie.svg";
type Props = {};

export default function Trending({}: Props) {
  return (
    <div className="mb-4">
      <h3 className="my-4 text-xl">Trending</h3>
      <div className="carousel-end carousel rounded-box mb-4 gap-4">
        <div className="carousel-item relative">
          <Image
            alt="image"
            className="rounded-md"
            width="400"
            height="200"
            src={Thing}
          />
          <div className="absolute right-0 top-0 mr-[1em] mt-[1em] rounded-full bg-gray-700 p-3 opacity-60">
            <Image width="20" height="20" alt="bookmark" src={Bookmark} />
          </div>
          <div className=" absolute bottom-0 left-0 mb-4 ms-4 flex w-[50%] flex-col">
            <div className="mb-2 flex flex-row items-center justify-between">
              <p>
                2019 <span className="text-xs">●</span>
              </p>
              <div>
                <Image width="20" height="10" alt="bookmark" src={Category} />
              </div>
              <p>
                Movie <span className="text-xs">●</span>
              </p>

              <p>PG </p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="carousel-item relative">
          <Image alt="image" width="400" height="200" src={Thing} />
          <div className="absolute right-0 top-0">
            <Image width="100" height="100" alt="bookmark" src={Bookmark} />
          </div>
          <div className="absolute bottom-0 left-0 flex flex-col">
            <div className="flex flex-row">
              <p>2019</p>
              <Image width="50" height="50" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="carousel-item relative">
          <Image alt="image" width="400" height="200" src={Thing} />
          <div className="absolute right-0 top-0">
            <Image width="100" height="100" alt="bookmark" src={Bookmark} />
          </div>
          <div className="absolute bottom-0 left-0 flex flex-col">
            <div className="flex flex-row">
              <p>2019</p>
              <Image width="50" height="50" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="carousel-item relative">
          <Image alt="image" width="400" height="200" src={Thing} />
          <div className="absolute right-0 top-0">
            <p>PG</p>
          </div>
          <h3>Beyond Earth</h3>
          <div className="absolute bottom-0 left-0 flex flex-col">
            <div className="flex flex-row">
              <p>2019</p>
              <Image width="50" height="50" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
        <div className="carousel-item relative">
          <Image alt="image" width="400" height="200" src={Thing} />
          <div className="absolute right-0 top-0">
            <Image width="100" height="100" alt="bookmark" src={Bookmark} />
          </div>
          <div className="absolute bottom-0 left-0 flex flex-col">
            <div className="flex flex-row">
              <p>2019</p>
              <Image width="50" height="50" alt="bookmark" src={Category} />
              <p>PG</p>
            </div>
            <h3>Beyond Earth</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
