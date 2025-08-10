import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

const filesSlice = createSlice({
  name: "path",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(openFolderAsync.fulfilled, (state, action) => {
      state.absolutePath = [...state.absolutePath, action.payload.folderId];
      state.files = action.payload.folders;
    });
  },
});

export const openFolderAsync = createAsyncThunk(
  "files/openFolderAsync",
  async ({ token, folderId }: { token: string; folderId: string }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/folder/${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      folderId,
      folders: response.data.folders,
    };
  }
);

export default filesSlice.reducer;
