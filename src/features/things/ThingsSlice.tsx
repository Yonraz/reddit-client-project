import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  processRedditResponse,
  RedditResponse,
} from "../../services/processRedditJson";
import Thing from "../../types/thingType";

interface ThingsState {
  thingById: Record<string, Thing>;
  isLoading: boolean;
  hasError: boolean;
}

export const getThings = createAsyncThunk("listings/getThings", async () => {
  try {
    const response = await fetch(
      "https://www.reddit.com/r/ANormalDayInRussia/comments.json?limit=5&utm_name=random_subreddit"
    );
    const json: RedditResponse = JSON.parse(response.toString());
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
      .addCase(getThings.pending, (state: ThingsState) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        getThings.fulfilled,
        (state: ThingsState, action: Record<string, Thing>) => {
          state.thingById = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(getThings.rejected, (state: ThingsState) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const ThingsSlice = createSlice(options);
export default ThingsSlice.reducer;
export const selectThings = (state) => state.things.thingById;
export const thingsIsLoading = (state) => state.things.isLoading;
