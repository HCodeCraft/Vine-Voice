// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import { fetchUserById } from "../users/userSlice";

const apiUrl = config.API_BASE_URL;



export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const user = await response.json();

      if (user.error) {
        throw new Error("Invalid Username or Password");

      }
      console.log("user from login", user)
      return user
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true; 
    } else {
      throw new Error('Logout failed'); 
    }
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.userInfo = null;
      state.success = true;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setUserInfo } = authSlice.actions

export const authReducer = authSlice.reducer
