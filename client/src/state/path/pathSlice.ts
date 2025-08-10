import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import getFiles from "../helpers/getFiles";
import createOrUpdateFile from "../helpers/createOrUpdateFile";

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
      .addCase(openFileAsync.fulfilled, (state, action) => {
        state.absolutePath = [...state.absolutePath, action.payload.fileId];
        state.files = action.payload.files;
      })
      .addCase(exitFileAsync.fulfilled, (state, action) => {
        if (state.absolutePath.length > 2) {
          state.absolutePath = [...state.absolutePath.slice(0, -1)];
        }
        state.files = action.payload.files;
      })
      .addCase(createFileAsync.fulfilled, (state, action) => {
        state.files = [...state.files, action.payload.file];
      });
  },
});

export const exitFileAsync = createAsyncThunk<
  any,
  { token: string },
  { state: RootState }
>("path/exitFileAsync", async ({ token }, { getState }) => {
  const state = getState();
  const currentPath = state.path.absolutePath;
  //Leave the current file
  const fileId = currentPath[currentPath.length - 2];
  const response = await getFiles(token, fileId);
  return {
    fileId,
    files: response.data.folders,
  };
});

export const openFileAsync = createAsyncThunk(
  "path/openFileAsync",
  async ({ token, fileId }: { token: string; fileId: string }) => {
    const response = await getFiles(token, fileId);

    return {
      fileId,
      files: response.data.folders,
    };
  }
);
export const createFileAsync = createAsyncThunk<
  any,
  {
    fileName: string;
    userId: string;
    token: string;
    type: string;
  },
  { state: RootState }
>(
  "path/createFileAsync",
  async ({ fileName, userId, token, type }, { getState }) => {
    const state = getState();
    const absolutePath = state.path.absolutePath;
    const parentId = absolutePath[absolutePath.length - 1];
    const response = await createOrUpdateFile(
      fileName,
      userId,
      token,
      parentId
    );

    return {
      file: response.data.folder,
    };
  }
);
export default pathSlice.reducer;
