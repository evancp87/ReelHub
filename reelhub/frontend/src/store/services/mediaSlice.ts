{/* @ts-expect-error Server Component */} 
import { createSlice, createAsyncThunk , PayloadAction} from "@reduxjs/toolkit";

// import {Media} from "@/types/media";

// type MediaState = {
//   content: Array<object>,
//   recommended:Array<string>,
//   trending: Array<string>,
//   searchInput: String
//   bookmarked: Array<string>,
//   initialMedia: Media[]
  
// };

// const initialState = {

//     content: [],
//     recommended: [],
//     trending: [],
//     searchInput: "",
//     bookmarked: [],
//     initialMedia: []
// } as MediaState;


const initialState = {
  search: ""
}





export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    
    searchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
   

export const {
searchQuery,
} = mediaSlice.actions;

export const selectSearch = (state) => state.media.searchInput;


export default mediaSlice.reducer;
