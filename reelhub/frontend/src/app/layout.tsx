// "use client";
import "./globals.css";
import Head from "next/head";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});
import type { Metadata } from "next";

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

import React from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import AuthProvider from "../components/AuthProvider";

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
        <link rel="shortcut icon" href="images/favicon.ico" />
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
