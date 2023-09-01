import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Media} from "./types";
import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
// The base URL 
const BASE_API_URL = "http://localhost:6002";

// const customFetchFn = async (url: RequestInfo, options?: RequestInit): Promise<any> => {
//   const response: Response = await fetch(url, options);
//   const data = await response.json();
//   return data;
// };

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    // fetchFn: customFetchFn
  }),
  endpoints: (builder) => ({
    getMedia: builder.query<Media[], null>({
      query: () => "/media/",
    
    }),
    getMediaByCategory: builder.query<Media[], string>({
      query: (category) => `/media/category/${category}`,
    
    }),
    getTrendingMedia: builder.query<Media[], null>({
      query: () => "/media/trending",
   
    }),
  }),
});

// Exporting the generated hooks for usage in components
export const { useGetMediaQuery, useGetMediaByCategoryQuery, useGetTrendingMediaQuery } = mediaApi;
