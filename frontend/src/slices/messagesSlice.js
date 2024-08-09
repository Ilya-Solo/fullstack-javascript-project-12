import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

const initialState = {
  messages: {},
  currentMessageText: "",
  socketStatus: "disconnected",
  status: "idle",
  error: null,
};

export const messagesSocket = io("/");

export const connectMessagesSocket = createAsyncThunk(
  "messages/connectMessagesSocket",
  async (_, { dispatch }) => {
    messagesSocket.on("connect", () => {
      dispatch(socketConnected());
    });

    messagesSocket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });

    messagesSocket.on("disconnect", () => {
      dispatch(socketDisconnected());
    });

    messagesSocket.on("error", () => {
      dispatch(fetchMessages());
    });
  },
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/messages", {
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

export const addMessageReqPost = createAsyncThunk(
  "messages/addMessageReqPost",
  async ({ body, channelId, username, token }, { rejectWithValue }) => {
    try {
      const newMessage = { body, channelId, username };
      const response = await axios.post("/api/v1/messages", newMessage, {
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

export const editMessageReqPost = createAsyncThunk(
  "messages/editMessageReqPost",
  async ({ id, body, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/messages/${id}`,
        { body },
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

export const deleteMessageReqPost = createAsyncThunk(
  "messages/deleteMessageReqPost",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/messages/${id}`, {
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

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addCurrentMessageText: (state, { payload }) => {
      const { message } = payload;
      state.currentMessageText = message;
    },
    removeCurrentMessageText: (state) => {
      state.currentMessageText = "";
    },
    addMessage: (state, { payload }) => {
      const { channelId } = payload;
      if (!state.messages[channelId]) {
        state.messages[channelId] = [];
      }
      state.messages[channelId].push(payload);
      state.messages[channelId].sort((m1, m2) => m1.id - m2.id);
    },
    removeMessage: (state, { payload: { id, channelId } }) => {
      if (state.messages[channelId]) {
        state.messages[channelId] = state.messages[channelId].filter(
          (message) => message.id !== id,
        );
      }
    },
    updateMessage: (state, { payload }) => {
      const { id, body, channelId } = payload;
      if (state.messages[channelId]) {
        const message = state.messages[channelId].find((m) => m.id === id);
        if (message) {
          message.body = body;
        }
      }
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
      .addCase(connectMessagesSocket.fulfilled, (state) => {
        state.socketStatus = "connected";
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        payload.forEach((message) => {
          const { channelId } = message;
          if (!state.messages[channelId]) {
            state.messages[channelId] = [];
          }
          state.messages[channelId].push(message);
        });

        Object.values(state.messages).forEach((messages) => {
          messages.sort((m1, m2) => m1.id - m2.id);
        });
      })
      .addCase(addMessageReqPost.fulfilled, (state, { payload }) => {
        slice.caseReducers.addMessage(state, { payload });
      })
      .addCase(editMessageReqPost.fulfilled, (state, { payload }) => {
        slice.caseReducers.updateMessage(state, { payload });
      })
      .addCase(deleteMessageReqPost.fulfilled, (state, { payload: id }) => {
        const channelId = Object.keys(state.messages).find((channelId) =>
          state.messages[channelId].some((message) => message.id === id),
        );
        if (channelId) {
          slice.caseReducers.removeMessage(state, {
            payload: { id, channelId },
          });
        }
      });
  },
});

export const {
  addCurrentMessageText,
  removeCurrentMessageText,
  addMessage,
  removeMessage,
  updateMessage,
  socketConnected,
  socketDisconnected,
} = slice.actions;

export default slice.reducer;

export const getMessagesLength = (state, activeChannelId) => {
  return state.messages.messages[activeChannelId]?.length || 0;
}
export const getMessages = (state, activeChannelId) => {
  return state.messages?.messages[activeChannelId] || [];
}
