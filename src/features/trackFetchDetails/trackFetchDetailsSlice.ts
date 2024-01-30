import { createSlice } from "@reduxjs/toolkit";
import { subredditOptions } from "../subredditOptions/subredditOptions";

interface FetchData {
  after: string;
  dist: number;
}

interface SubredditMap {
  [name: string]: FetchData;
}

let initialMap: SubredditMap = {};
function setInitialMap() {
  subredditOptions.forEach(
    (option) =>
      (initialMap = {
        ...initialMap,
        [option]: { after: "", dist: 0 },
      })
  );
}
setInitialMap();

const initialState = {
  subredditMap: initialMap,
};

export const TrackFetchDetailsSlice = createSlice({
  name: "trackFetchDetails",
  initialState,
  reducers: {
    updateFetchDetails(state, action) {
      const { subreddit, fetchData } = action.payload;
      const newData = {
        after: fetchData.after,
        dist: state.subredditMap[subreddit].dist + fetchData.dist,
      };
      state.subredditMap[subreddit] = newData;
    },
  },
});

export default TrackFetchDetailsSlice.reducer;
export const { updateFetchDetails } = TrackFetchDetailsSlice.actions;
export const selectFetchData = (subreddit: string) => (state) =>
  state.trackFetchDetails.subredditMap[subreddit];
