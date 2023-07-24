{/* @ts-expect-error Server Component */} 
import { createSlice, createAsyncThunk , PayloadAction} from "@reduxjs/toolkit";
import { getData } from "../../utils/helpers";

import {Media} from "@/types/media";

type MediaState = {
  content: Array<object>,
  recommended:Array<string>,
  trending: Array<string>,
  searchInput: String
  bookmarked: Array<string>,
  initialMedia: Media[]
  
};

const initialState = {

    content: [],
    recommended: [],
    trending: [],
    searchInput: "",
    bookmarked: [],
    initialMedia: []
} as MediaState;

// getting main list of media
export const setMedia = createAsyncThunk("show/media", async () => {
  try {
    const response = await getData();
    return response;
  } catch (error) {
    console.log("Error fetching shows:", error);
    throw error;
  }
});




export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    
    search: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setInitialMedia: (state, action: PayloadAction<Media[]>) => {

      state.content = action.payload;
    }

    // filterByMovie: (state) => {
    //   if (state.content && state.content.length) {
    //     const movies
    //     const highest = state.games.filter((game) => game.rating >= 4.5);
    //     const topTen = highest.slice(0, 10);
    //     state.allTimeBest = topTen;
    //   }
    // },
    // // filters games list for highest rated games
    // filterByTv: (state) => {
    //   if (state.games && state.games.length) {
    //     const tvShows = state.games.filter((game) => game.rating >= 4.5);
    //     const topTen = highest.slice(0, 10);
    //     state.allTimeBest = topTen;
    //   }
    // },
    // toggles liked state on game cards
    // bookmark: (state, action) => {
    //   // find show within the state and add it to bookmarks
    //   const title = action.payload;
    //   const show = state.content.findIndex(show => show.title = title);

    //   action.payload
    //   const updatedBookmarks = [...state.content, show]

    //   state.bookmarked = updatedBookmarks



    // },
    // trending: (state, action) => {

    // }

  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(setMedia.fulfilled, (state, action: PayloadAction<Media[]>) => {

  //       state.content = action.payload;
  //     })
  //     // .addCase(setGamesByDate.fulfilled, (state, action) => {
  //     //   state.newlyReleasedGames = action.payload;
  //     // });
  // },
});

export const {
search, setInitialMedia
} = mediaSlice.actions;

export const selectMedia = (state) => state.media.initialMedia;
export const selectSearch = (state) => state.media.searchInput;


export default mediaSlice.reducer;
