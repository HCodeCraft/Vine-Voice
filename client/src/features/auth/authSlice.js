// authSlice.js

import { createSlice } from "@reduxjs/toolkit";


//// Not using

const initialState = {
  user: null, // User data if authenticated
  isAuthenticated: false, // Authentication status
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Check if a user is authenticated
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
