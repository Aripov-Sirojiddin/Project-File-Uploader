import { createSlice } from "@reduxjs/toolkit";

interface SelectedFileState {
  id: string | null;
  name: string;
  edit: boolean;
}

const initialState: SelectedFileState = {
  id: null,
  name: "New Folder",
  edit: false,
};

const selectedFileSlice = createSlice({
  name: "selectedFile",
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.edit = action.payload.edit;
    },
    resetSelectedFile: (state) => {
      state.id = initialState.id;
      state.name = initialState.name;
      state.edit = initialState.edit;
    },
  },
});

export const { setSelectedFile, resetSelectedFile } = selectedFileSlice.actions;
export default selectedFileSlice.reducer;
