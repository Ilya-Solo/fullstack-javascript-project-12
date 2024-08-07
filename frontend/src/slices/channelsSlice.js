import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: {},
  activeChannelId: '',
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, { payload: channels }) => {
      state.channels = channels.reduce((acc, channel) => {
        acc[channel.id] = channel;
        return acc;
      }, {});
    },
  },
});

export const { setChannels } = slice.actions;

export default slice.reducer;
