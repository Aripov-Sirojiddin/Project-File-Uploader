import { createSlice } from "@reduxjs/toolkit";

interface EditFileState {
  id: string | null;
  name: string;
}

const initialState: EditFileState = {
  id: null,
  name: "New Folder",
};

const editFileSlice = createSlice({
  name: "editFile",
  initialState,
  reducers: {
    setEditFile: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    resetEditFile: (state) => {
      state.id = null;
      state.name = "";
    },
  },
});

export const { setEditFile, resetEditFile } = editFileSlice.actions;
export default editFileSlice.reducer;
