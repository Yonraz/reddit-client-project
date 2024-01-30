import { createSlice } from "@reduxjs/toolkit";

const initialState = { selection: "" };

export const SubredditSelectionSlice = createSlice({
  name: "subredditSelection",
  initialState,
  reducers: {
    changeSelection(state, action) {
      state.selection = action.payload;
    },
  },
});
export default SubredditSelectionSlice.reducer;
export const { changeSelection } = SubredditSelectionSlice.actions;
export const selectSubredditSelection = (state) =>
  state.subredditSelection.selection;
