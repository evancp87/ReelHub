import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {User, Media, Category, UserId, Bookmark} from "./types";

 
// The base URL 
const BASE_API_URL = "http://localhost:6002/";



export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
   
    getUserBookmarks: builder.query<Bookmark[], {userId: UserId}>({
        query: (userId) => `/bookmarks/${userId}`,
    
      }),
      getUserBookmarksByCategory: builder.query<Bookmark[], {userId: UserId, category: Category}>({
        query: ({userId, category}) => `/bookmarks/${category}/${userId}`,

    
      }),
    addBookmark: builder.mutation<Bookmark, Partial<Bookmark>>({
      query: (bookmark) => ({
        url: 'media/add',
        method: 'POST',
        body: bookmark,
      }),
    }),
    deleteMedia: builder.mutation<{ success: boolean, message: string }, string>({
      query: (id) => ({
        url: `bookmarks/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Exporting the generated hooks for usage in components
export const { useGetUserBookmarksQuery,  useGetUserBookmarksByCategoryQuery, useAddBookmarkMutation, useDeleteMediaMutation} = bookmarkApi;
