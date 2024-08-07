import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import channelsReducer from "./channelsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
