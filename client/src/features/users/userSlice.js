import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

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
      console.log("user from login", user);
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    throw error;
  }
});

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
      console.log("fetchUserBy Ids data", data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserInApi = createAsyncThunk(
  "user/updateUserInApi",
  async ({ userId, updatedUser }) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update user failed");
      }

      const updatedUserData = await response.json();
      console.log("updatedUserData in api data", updatedUserData);
      return updatedUserData;
    } catch (error) {
      throw error;
    }
  }
);
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
    setUser: (state, action) => {
      state.individualUser = action.payload;
    },
    resetUser: (state) => {
      state.individualUser = null;
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    updateUser: (state, action) => {
      console.log("🌻updateUser is running");
      const { id, updates } = action.payload;
      console.log("id from updateUser", id);
      console.log("updates from updateUser", updates);
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === id) {
          // Create a new object with the updated status and other attributes
          console.log("user from updateUser", user);
          return { ...user, ...updates };
        }
        return user; // Return unmodified users
      });
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
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.individualUser = action.payload;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.individualUser = null;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, resetUser, addUser, updateUser, deleteUser } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
