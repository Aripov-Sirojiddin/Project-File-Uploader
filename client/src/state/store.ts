import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import pathReducer from "./path/pathSlice";
import selectedFileReducer from "./selectedFile/selectedFileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    path: pathReducer,
    selectedFile: selectedFileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
