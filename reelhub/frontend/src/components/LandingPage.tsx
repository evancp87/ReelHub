// "use client";
import React from "react";
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import tv from "../../public/assets/tv.svg";
import Link from "next/link";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <div className="h-screen w-full">
      <header
        className="min-h-screen w-full backdrop-blur-md backdrop-sepia md:backdrop-filter-none"
        style={{
          backgroundImage:
            "url('https://reelhub.s3.eu-west-2.amazonaws.com/pexels-karolina-grabowska-5202957.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <nav className="flex justify-between px-4 pt-2">
          <Image
            alt="image"
            className="rounded-md"
            width="50"
            height="50"
            src={logo}
          />
          <Link href="/authentication/login">
            <button className="w-[100px] rounded-md bg-red p-4">Login</button>
          </Link>
        </nav>
        <div className="flex h-screen flex-col items-center justify-center gap-y-4">
          <div className="flex w-[250px] flex-col gap-y-4 md:w-[300px]">
            <p className="text-2xl md:text-3xl">
              Unlimited movies, TV shows, and more.{" "}
            </p>
            <p>Watch anywhere. Cancel anytime. </p>
            <p>Ready to watch? Sign up!</p>
            <Link href="/authentication/register">
              <button className="w-[200px] rounded-md bg-red p-4 md:w-[300px]">
                Get Started by Signing Up
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
