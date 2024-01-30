import { configureStore } from "@reduxjs/toolkit";
import thingsReducer from "../features/things/ThingsSlice";
import subredditSelectionReducer from "../features/subredditSelect/SubredditSelectSlice";
import commentsReducer from "../features/comments/CommentsSlice.ts";
import fetchDetailsReducer from "../features/trackFetchDetails/trackFetchDetailsSlice.ts";
const store = configureStore({
  reducer: {
    things: thingsReducer,
    subredditSelection: subredditSelectionReducer,
    comments: commentsReducer,
    trackFetchDetails: fetchDetailsReducer,
  },
});
export default store;
