import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { processRedditResponse } from "../../helpers/processRedditJson";

export const getThings = createAsyncThunk("things/getThings", async () => {
  try {
    const response = await fetch(
      "https://www.reddit.com/r/ANormalDayInRussia/comments.json?limit=5&utm_name=random_subreddit"
    );
    console.log(response);
    const json = JSON.parse(response.toString());
    const things = processRedditResponse(json);
    return things;
  } catch (error) {
    console.log(error);
  }
});

const initialState = { thingById: {}, isLoading: false, hasError: false };
const options = {
  name: "things",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getThings.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getThings.fulfilled, (state, action) => {
        state.thingById = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getThings.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};
export const ThingsSlice = createSlice(options);
export default ThingsSlice.reducer;
export const selectThings = (state) => state.things.thingById;
export const thingsIsLoading = (state) => state.things.isLoading;
