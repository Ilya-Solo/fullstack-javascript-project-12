import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

const initialState = {
  channels: {},
  activeChannelId: "1",
  socketStatus: "disconnected",
  status: "idle",
  error: null,
};

export const channelsSocket = io("/");

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
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const connectChannelsSocket = createAsyncThunk(
  "channels/connectChannelsSocket",
  async (_, { dispatch }) => {
    channelsSocket.on("connect", () => {
      dispatch(socketConnected());
    });

    channelsSocket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });

    channelsSocket.on("removeChannel", (payload) => {
      dispatch(removeChannel(payload));
    });

    channelsSocket.on("renameChannel", (payload) => {
      dispatch(renameChannel(payload));
    });

    channelsSocket.on("disconnect", () => {
      dispatch(socketDisconnected());
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
    removeChannel: (state, { payload: id }) => {
      delete state.channels[id];
    },
    renameChannel: (state, { payload: { id, name } }) => {
      state.channels[id].name = name;
    },
    setActiveChannel: (state, { payload: id }) => {
      state.activeChannelId = id;
    },
    socketConnected: (state) => {
      state.socketStatus = "connected";
    },
    socketDisconnected: (state) => {
      state.socketStatus = "disconnected";
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
      })
      .addCase(updateChannel.fulfilled, (state, { payload }) => {
        slice.caseReducers.renameChannel(state, {
          payload: { id: payload.id, name: payload.name },
        }); // Используем renameChannel
      })
      .addCase(deleteChannel.fulfilled, (state, { payload: id }) => {
        slice.caseReducers.removeChannel(state, { payload: id });
      })
      .addCase(connectChannelsSocket.fulfilled, (state) => {
        slice.caseReducers.socketConnected(state);
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
export const getChannelName = (state, activeChannelId) =>{
  return state.channels.channels[activeChannelId]?.name || "";
}
