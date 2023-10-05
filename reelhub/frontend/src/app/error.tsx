"use client";
import Link from "next/link";
import Image from "next/image";
import { selectCurrentUser } from "@/store/services/usersSlice";
import { useAppSelector } from "@/store/hooks";
export default function Error() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="global flex h-screen flex-col items-center justify-center gap-y-4">
      <div className="flex w-[250px] flex-col gap-y-4 md:w-[300px] lg:w-[400px]">
        <h2 className="text-2xl md:text-4xl lg:text-6xl">Error</h2>
        <p className="text-lg"> Something went wrong</p>
        <div>
          <Image
            className="mb-4 aspect-[5/5] w-full"
            height="300"
            width="300"
            src="https://reelhub.s3.eu-west-2.amazonaws.com/not-found.jpg"
            alt="not-found"
          />
          {user ? (
            <Link href="/dashboard">
              <button className="sm:self-normal w-full self-center rounded-md bg-red p-4 hover:bg-white hover:text-black ">
                Return Home
              </button>
            </Link>
          ) : (
            <Link href="/authentication/login">
              <button className="sm:self-normal w-full self-center rounded-md bg-red p-4 hover:bg-white hover:text-black ">
                Go to login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
