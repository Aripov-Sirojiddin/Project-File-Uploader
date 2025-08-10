import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import pathReducer from "./path/pathSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    path: pathReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
