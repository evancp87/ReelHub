import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import {mediaReducer} from "./services/mediaSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { mediaApi } from "./services/mediaApi";
import { bookmarkApi } from "./services/bookmarksApi";
import { userApi } from "./services/userApi";


export const store = configureStore({
  reducer: { media: mediaReducer,
  [mediaApi.reducerPath]: mediaApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [bookmarkApi.reducerPath] : bookmarkApi.reducer
  },
  
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([mediaApi.middleware]),
});


setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
