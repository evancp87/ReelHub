import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import mediaReducer from "./services/mediaSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { mediaApi } from "./services/mediaApi";
import { bookmarkApi } from "./services/bookmarksApi";
import { userApi } from "./services/userApi";
import userReducer from "./services/usersSlice";


export const store = configureStore({
  reducer: { 
    media: mediaReducer,
    users: userReducer,
  [mediaApi.reducerPath]: mediaApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [bookmarkApi.reducerPath] : bookmarkApi.reducer
  },
  
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([mediaApi.middleware, userApi.middleware, bookmarkApi.middleware]),
});


setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
