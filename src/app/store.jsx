import { configureStore } from "@reduxjs/toolkit";
import thingsReducer from "../features/things/ThingsSlice";
const store = configureStore({
  reducer: {
    things: thingsReducer,
  },
});
export default store;
