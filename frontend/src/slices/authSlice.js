import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const initialState = {
  username,
  token,
};

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
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectIsAuthenticated = (state) =>
  state.auth.username !== null && state.auth.token !== null;

export const getAuthInfo = (state) => state.auth;
