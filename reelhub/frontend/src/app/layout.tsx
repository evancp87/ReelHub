// "use client";

import "./globals.css";
import Head from "next/head";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Sidebar from "../components/Sidebar";
// import Controls from "../components/Controls";

// const inter = Inter({ subsets: ["latin"] });
<Head>
  <link rel="shortcut icon" href="/favicon.ico" />
</Head>;
export const metadata: Metadata = {
  title: "Reelhub",
  description: "An entertainment app",
  // openGraph: {
  //   title: 'Reelhub',
  //   description: 'An entertainment app',
  //   type: 'website',
  //   // url: 'https://yourwebsite.com/your-page-url',
  //   image: {
  //     url: 'https://yourwebsite.com/your-image-url',
  //     alt: 'Alt text for your image',
  //     width: 1200,
  //     height: 630,
  //   },
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
// https://www.youtube.com/watch?v=Yokjzp91A4o
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Controls from "@/components/Controls";
import { ReduxProvider } from "@/components/ReduxProvider";
import { useGetTrendingMediaQuery } from "../store/services/mediaApi";
import TrendingCard from "@/components/TrendingCard";
import AuthProvider from "../components/AuthProvider";

// const handle;
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.image.url} />
        <meta property="og:image:alt" content={metadata.openGraph.image.alt} />
        <meta property="og:image:width" content={metadata.openGraph.image.width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.image.height.toString()} /> */}
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={outfit.className}>
        {/* <Sidebar /> */}
        {/* <main className="flex min-h-screen w-full flex-col items-center  p-[2em]"> */}
        {/* <Controls /> */}
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
        {/* </main> */}
      </body>
    </html>
  );
};

export default RootLayout;
