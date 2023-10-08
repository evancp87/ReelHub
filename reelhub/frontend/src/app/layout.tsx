// "use client";
import "./globals.css";
import Head from "next/head";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});
import type { Metadata } from "next";
import Favicon from "/public/images/favicon.ico";

export const metadata: Metadata = {
  openGraph: {
    title: "ReelHub",
    description: "An entertainment app",
    url: "https://reelhub.vercel.app/",
    siteName: "ReelHub",
    images: [
      {
        url: "https://reelhub.s3.eu-west-2.amazonaws.com/Reelhub.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

import React from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import AuthProvider from "../components/AuthProvider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      </Head>
      <body className={outfit.className}>
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
