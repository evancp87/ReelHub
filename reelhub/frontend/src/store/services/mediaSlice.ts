
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

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
