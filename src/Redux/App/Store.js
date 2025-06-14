import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./Slice/Slice";

const store = configureStore({
  reducer: {
    users: SliceReducer,
  },
  devTools: true
});

export default store;
