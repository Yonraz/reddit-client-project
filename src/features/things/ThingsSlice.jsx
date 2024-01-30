import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thingBySubreddit: {},
  isLoading: false,
  hasError: false,
  fetchedSubreddits: [],
};
export const ThingsSlice = createSlice({
  name: "things",
  initialState: initialState,
  reducers: {
    addThing(state, action) {
      state.thingById = {
        ...state.thingById,
        [action.payload.id]: action.payload,
      };
    },
    addListOfThings(state, action) {
      const { subreddit, things } = action.payload;
      const chosenSubreddit = state.thingBySubreddit[subreddit];
      things.forEach((thing) => {
        chosenSubreddit.thingById = {
          ...chosenSubreddit.thingById,
          [thing.id]: thing,
        };
      });
    },
    addCommentIds(state, action) {
      const { postId, commentIds } = action.payload;
      const thing = state.thingById[postId];
      if (thing === undefined) return;
      thing.commentIds = [...thing.commentIds, ...commentIds];
    },
    addFetchedSubreddit(state, action) {
      state.fetchedSubreddits.push(action.payload);
    },
  },
});
export default ThingsSlice.reducer;
// eslint-disable-next-line react-refresh/only-export-components
export const selectThings = (state) => state.things.thingById;
export const selectThingById = (subreddit, id) => (state) =>
  state.things.thingBySubreddit[subreddit].thingById[id];
// eslint-disable-next-line react-refresh/only-export-components
export const thingsIsLoading = (state) => state.things.isLoading;
export const selectIsSubredditFetched = (subreddit) => (state) =>
  state.things.fetchedSubreddits.includes(subreddit);
// eslint-disable-next-line react-refresh/only-export-components
export const { addThing, addListOfThings, addCommentIds, addFetchedSubreddit } =
  ThingsSlice.actions;
