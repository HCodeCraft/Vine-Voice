import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

const apiUrl = config.API_BASE_URL;

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const data = await response.json();
      console.log("fetchUser's data", data)
      return data;
    } catch (error) {
      throw error;
    }
  }
);

/// need login action, logout action, <= auth slice?

// I want to get the data for all the users and also an individual user
// individual user for the user page, but when would I be using all the users? Just to change the user state

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    individualUser: null,
    loadingAllUsers: false,
    loadingIndividualUser: false,
    errorAllUsers: null,
    errorIndividualUser: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.individualUser = payload;
    },
    resetCredentials: (state) => {
      state.individualUser = null;
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const userToUpdate = state.allUsers.find((user) => user.id === id);
      if (userToUpdate) {
        Object.assign(userToUpdate, updates);
      }
    },
    deleteUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loadingAllUsers = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loadingAllUsers = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loadingAllUsers = false;
        state.errorAllUsers = action.error.message;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.loadingIndividualUser = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.individualUser = action.payload;
        state.loadingIndividualUser = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingIndividualUser = false;
        state.errorIndividualUser = action.error.message;
      });
  },
});

export const {
  setCredentials,
  resetCredentials,
  addUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
