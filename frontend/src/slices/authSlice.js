import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const initialState = {
  username,
  token,
};

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/login", values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/signup", values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* eslint-disable no-shadow */
    setCredentials: (state, { payload: { username, token } }) => {
      state.username = username;
      state.token = token;
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      /* eslint-disable no-shadow */
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        slice.caseReducers.setCredentials(state, { payload });
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        slice.caseReducers.setCredentials(state, { payload });
      });
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectIsAuthenticated = (state) =>
  state.auth.username !== null && state.auth.token !== null;

export const getAuthInfo = (state) => state.auth;
