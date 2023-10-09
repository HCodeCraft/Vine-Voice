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
      state.userInfo = payload;
    },
    resetCredentials: (state) => {
      state.userInfo = null;
    },
    addUser: (state, action) => {
      const { username, email, name, password, receive_dev_emails } =
        action.payload;
      const newUser = {
        username,
        email,
        name,
        password,
        receive_dev_emails,
      };
      state.users.push(newUser);
    },
    // update user
    updateUser: (state, action) => {
      const { id, updates } = action.payload;

      const userToUpdate = state.users.find((user) => user.id === id);

      if (userToUpdate) {
        Object.assign(userToUpdate, updates);
      }
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
  },
});



export const {
  setCredentials,
  resetCredentials,
  addUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
