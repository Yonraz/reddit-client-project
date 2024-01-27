import { ReducerType, configureStore } from "@reduxjs/toolkit";
import thingsReducer from "../features/things/ThingsSlice";

export const store = configureStore({
  reducer: {
    things: thingsReducer,
  },
});
