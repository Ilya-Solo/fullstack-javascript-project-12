import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import channelsReducer from "./channelsSlice";
import messagesReducer from "./messagesSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
    channels: channelsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
