import { createSlice } from "@reduxjs/toolkit";

interface EditFileState {
  id: string | null;
}

const initialState: EditFileState = {
  id: null,
};

const editFileSlice = createSlice({
  name: "editFile",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetId: (state) => {
      state.id = null;
    },
  },
});

export const { setId, resetId } = editFileSlice.actions;
export default editFileSlice.reducer;
