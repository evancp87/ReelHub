import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Category, UserId, Bookmark, AddBookmark} from "./types";

 
// The base URL 
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;






export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).users.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    }
  }),
  endpoints: (builder) => ({
   
    getUserBookmarks: builder.query<Bookmark[], string>({
        query: (userId) => `/bookmarks/${userId}`,
  
      }),
      getUserBookmarksByCategory: builder.query<Bookmark[], {category: Category, userId: UserId, }>({
        query: ({category, userId}) => `/bookmarks/${category}/${userId}`,

    
      }),
    addBookmark: builder.mutation<Bookmark, AddBookmark>({
      query: (bookmark) => ({
        url: '/bookmarks/add',
        method: 'PUT',

        body: bookmark,
      }),
    }),
    deleteMedia: builder.mutation<{ success: boolean, message: string }, string>({
      query: (id) => ({
        url: `/bookmarks/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Exporting the generated hooks for usage in components
export const { useGetUserBookmarksQuery,  useGetUserBookmarksByCategoryQuery, useAddBookmarkMutation, useDeleteMediaMutation} = bookmarkApi;
