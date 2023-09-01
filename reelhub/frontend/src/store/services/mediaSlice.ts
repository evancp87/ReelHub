
import { createSlice, createAsyncThunk , PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Media} from "@/types/media";

// type MediaState = {
//   content: Array<object>,
//   recommended:Array<string>,
//   trending: Array<string>,
//   searchInput: String
//   bookmarked: Array<string>,
//   initialMedia: Media[]
  
// };

// // const initialState = {

// //     content: [],
// //     recommended: [],
// //     trending: [],
// //     searchInput: "",
// //     bookmarked: [],
// //     initialMedia: []
// // } as MediaState;

interface IInitialState {
  search: string;
}

const initialState = {
  search: ""
} as IInitialState;





 export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    
    searchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  }})

export const { searchQuery} = mediaSlice.actions;

export const selectSearch = (state: RootState  ) => state.media.search;


export default mediaSlice.reducer;
