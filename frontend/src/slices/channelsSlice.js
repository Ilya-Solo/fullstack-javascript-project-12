import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user,
  token,
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, { payload: channels }) => {
      channels.forEach(channel => {
        state.channels[channel.name] = channel;
      });
    },
  },
});

export const { setChannels } = slice.actions;

export default slice.reducer;


