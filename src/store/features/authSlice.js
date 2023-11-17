import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { status: "not authorized", user: null },
  reducers: {
    login: (state, action) => {
      state.status = "authorized";
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = "not authorized";
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
