import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "./initializeSocket";
import { deleteChannelFromMessages } from "./messagesSlice";

const defaultActiveChannelId = "1";

const initialState = {
  channels: {},
  activeChannelId: defaultActiveChannelId,
  socketStatus: "disconnected",
  status: "idle",
  error: null,
};

export const setChannelsReqGet = createAsyncThunk(
  "channels/setChannelsReqGet",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addChannelReqPost = createAsyncThunk(
  "channels/addChannelReqPost",
  async ({ name, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/channels",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateChannel = createAsyncThunk(
  "channels/updateChannel",
  async ({ id, name, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/channels/${id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteChannel = createAsyncThunk(
  "channels/deleteChannel",
  async ({ id, token }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteChannelFromMessages({ channelId: id }));
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const connectChannelsSocket = createAsyncThunk(
  "channels/connectChannelsSocket",
  async (_, { dispatch }) => {
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });

    socket.on("removeChannel", (payload) => {
      dispatch(deleteChannelFromMessages({ channelId: payload.id }));
      dispatch(removeChannel(payload));
    });

    socket.on("renameChannel", (payload) => {
      dispatch(renameChannel(payload));
    });
  },
);

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
    addChannel: (state, { payload: channel }) => {
      state.channels[channel.id] = channel;
    },
    removeChannel: (state, { payload: { id } }) => {
      if (state.channels[id]) {
        delete state.channels[id];
        if (state.activeChannelId === id) {
          state.activeChannelId = defaultActiveChannelId;
        }
      }
    },
    renameChannel: (state, { payload: { id, name } }) => {
      state.channels[id].name = name;
    },
    setActiveChannel: (state, { payload: { id } }) => {
      state.activeChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setChannelsReqGet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setChannelsReqGet.fulfilled, (state, { payload }) => {
        slice.caseReducers.setChannels(state, { payload });
        state.status = "succeeded";
      })
      .addCase(setChannelsReqGet.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(addChannelReqPost.fulfilled, (state, { payload }) => {
        slice.caseReducers.addChannel(state, { payload });
        slice.caseReducers.setActiveChannel(state, { payload });
      });
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setActiveChannel,
  socketConnected,
  socketDisconnected,
} = slice.actions;

export default slice.reducer;

export const getChannelsInfo = (state) => state.channels;
export const getChannelName = (state, activeChannelId) => {
  return state.channels.channels[activeChannelId]?.name || "";
};
export const channelUniqnessCheck = (channels, newChannelName) => {
  return !Object.values(channels.channels).some(
    (channel) => channel.name === newChannelName,
  );
};
