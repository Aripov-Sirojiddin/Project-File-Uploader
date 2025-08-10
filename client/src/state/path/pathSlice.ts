import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import getFolders from "../helpers/getFolders";

interface File {
  id: string;
  name: string;
  size: number;
  date: number;
  type: string;
  ownerId: string;
  parentId: string;
}

interface PathState {
  absolutePath: string[];
  files: File[];
}

const initialState: PathState = {
  absolutePath: [],
  files: [],
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(openFolderAsync.fulfilled, (state, action) => {
        state.absolutePath = [...state.absolutePath, action.payload.folderId];
        state.files = action.payload.folders;
      })
      .addCase(exitFolderAsync.fulfilled, (state, action) => {
        if (state.absolutePath.length > 2) {
          state.absolutePath = [...state.absolutePath.slice(0, -1)];
        }
        state.files = action.payload.folders;
      });
  },
});

export const exitFolderAsync = createAsyncThunk<
  any,
  { token: string },
  { state: RootState }
>("path/exitFolderAsync", async ({ token }, { getState }) => {
  const state = getState();
  const currentPath = state.path.absolutePath;
  //Leave the current folder
  const folderId = currentPath[currentPath.length - 2];

  const response = await getFolders(token, folderId);
  return {
    folderId,
    folders: response.data.folders,
  };
});

export const openFolderAsync = createAsyncThunk(
  "path/openFolderAsync",
  async ({ token, folderId }: { token: string; folderId: string }) => {
    const response = await getFolders(token, folderId);
    return {
      folderId,
      folders: response.data.folders,
    };
  }
);

export default pathSlice.reducer;
