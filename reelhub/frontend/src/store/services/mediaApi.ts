import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 import data from "../../data.json";

// Type definitions for media data
type Media = {
 title: string,
 year: number,
 thumbnail: string | {
    trending: {
      small: string;
      large: string;
    },
    regular: {
      small: string;
      medium: string;
      large: string;
    }
  },
 category: string,
 rating: string,
 isBookmarked: boolean,
 isTrending: boolean,
};

// thumbnail: {
//    trending: {
//        small: string,
//        large: string,

//    },
//    regular: {
//        small: string,
//        medium: string,
//        large: string,
//    },
// }


// The base URL 
const BASE_API_URL = "";



export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getMedia: builder.query<Media[], null>({
      query: () => "media",
    //   queryFn: async () => {
    //     return { data };
    //   },
    }),
  }),
});

// Exporting the generated hooks for usage in components
export const { useGetMediaQuery } = mediaApi;

// const initialState: MediaState = {
//   content: [],
//   recommended: [],
//   trending: [],
//   searchInput: "",
//   bookmarked: [],
//   initialMedia: [],
// };

// export const mediaSlice = createSlice({
//   name: "media",
//   initialState,
//   reducers: {
//     search: (state, action: PayloadAction<string>) => {
//       state.searchInput = action.payload;
//     },
//     setInitialMedia: (state, action: PayloadAction<Media[]>) => {
//       state.content = action.payload;
//     },
//   },
// });

// export const { search, setInitialMedia } = mediaSlice.actions;
// export default mediaSlice.reducer;
