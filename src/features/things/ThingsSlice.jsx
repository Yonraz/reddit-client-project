import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thingById: {},
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
      state.thingById = {};
      action.payload.forEach((thing) => {
        state.thingById = {
          ...state.thingById,
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
export const selectThingById = (id) => (state) => state.things.thingById[id];
// eslint-disable-next-line react-refresh/only-export-components
export const thingsIsLoading = (state) => state.things.isLoading;
export const selectIsSubredditFetched = (subreddit) => (state) =>
  state.things.fetchedSubreddits.includes(subreddit);
// eslint-disable-next-line react-refresh/only-export-components
export const { addThing, addListOfThings, addCommentIds, addFetchedSubreddit } =
  ThingsSlice.actions;
