// "use client"
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import mediaReducer from "../features/mediaSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query"
// import {mediaApi} from "../features/mediaApi";
import { mediaApi } from "./services/mediaApi";


export const store = configureStore({
  reducer: { media: mediaReducer,
  [mediaApi.reducerPath]: mediaApi.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([mediaApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
