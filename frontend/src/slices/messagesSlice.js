import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "./initializeSocket";

const initialState = {
  messages: {},
  currentMessageText: "",
  socketStatus: "disconnected",
  status: "idle",
  error: null,
};

export const connectSocket = createAsyncThunk(
  "messages/connectMessagesSocket",
  async (_, { dispatch }) => {
    socket.on("connect", () => {
      dispatch(socketConnected());
    });

    socket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });

    socket.on("disconnect", () => {
      dispatch(socketDisconnected());
    });

    socket.on("error", () => {
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

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      const { channelId } = payload;

      if (!state.messages[channelId]) {
        state.messages[channelId] = [];
      }

      const messagesArray = state.messages[channelId];
      const exists = messagesArray.some((msg) => msg.id === payload.id);
      if (!exists) {
        messagesArray.push(payload);
      }

      messagesArray.sort((m1, m2) => m1.id - m2.id);
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
    deleteChannelFromMessages: (state, { payload }) => {
      const { channelId } = payload;
      if (state.messages[channelId]) {
        delete state.messages[channelId];
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
      .addCase(connectSocket.fulfilled, (state) => {
        slice.caseReducers.socketConnected(state);
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        payload.forEach((message) => {
          const { channelId } = message;

          if (!state.messages[channelId]) {
            state.messages[channelId] = [];
          }

          const messagesArray = state.messages[channelId];
          const exists = messagesArray.some((msg) => msg.id === message.id);
          if (!exists) {
            messagesArray.push(message);
          }
        });

        Object.values(state.messages).forEach((messages) => {
          messages.sort((m1, m2) => m1.id - m2.id);
        });
      })
      .addCase(addMessageReqPost.fulfilled, () => {
        // slice.caseReducers.addMessage(state, { payload });
      });
  },
});

export const {
  addCurrentMessageText,
  removeCurrentMessageText,
  addMessage,
  removeMessage,
  updateMessage,
  deleteChannelFromMessages,
  socketConnected,
  socketDisconnected,
} = slice.actions;

export default slice.reducer;

export const getMessagesLength = (state, activeChannelId) => {
  return state.messages.messages[activeChannelId]?.length || 0;
};
export const getMessages = (state, activeChannelId) => {
  return state.messages?.messages[activeChannelId] || [];
};
// export const clearAllMessages = (state) => {
//   Object.values(state.messages.messages).forEach((channelMessages) => {
//     // eslint-disable-next-line no-unused-vars
//     channelMessages = [];
//   });
// };
