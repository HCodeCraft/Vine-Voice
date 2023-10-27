import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }) => {
    try {
      const response = await fetch(`/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const user = await response.json();
      console.log("user from login", user);
      if (user.error) {
        throw new Error("Invalid Username or Password");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_) => {
    try {
      const response = await fetch(`/me`);

      console.log("fetchUserData is running");

      if (!response.ok) {
        const errorData = await response.json(); // Retrieve the error data
        throw new Error(errorData.message || "fetchUserData failed");
      }

      // If the response is okay, return the user data
      const userData = await response.json();
      console.log("userDatat from fetchUserData", userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await fetch(`/logout`, {
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
      const response = await fetch(`/users`);
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
      const response = await fetch(`/users/${userId}`);
      const data = await response.json();
      console.log("fetchUserBy Ids data", data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);
// I know typing in the backendurl is messing with the session, but otherwise how could I put in that
// url for fetching? if I put `users/${userId}` it will send the request to localhost:4000
// all the other requests have been working (with localhost:4000) - I think that's because of my CORS
// With the request using localhost:4000, it says not authorized

export const registerUserInApi = createAsyncThunk(
  "user/registerUserInApi",
  async (newUser) => {
    try {
      const response = await fetch(`/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add user to API");
      }
      const data = await response.json();
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
      console.log("url trying to send to", `/users/${userId}`);
      const response = await fetch(`/users/${userId}`, {
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

export const addPlantToUser = createAsyncThunk(
  "user/addPlantToUser",
  (_, { getState }) => {
    const entry = getState().entry.individualEntry;
    const allPlants = getState().plant.allPlants;

    const newPlant = allPlants.find((plant) => plant.id === entry.plant_id);

    if (!newPlant) {
      return Promise.reject("Plant not found");
    }

    return newPlant;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    individualUser: null,
    loggedInUser: null,
    loggedIn: null,
    loadingAllUsers: false,
    loadingIndividualUser: false,
    errorAllUsers: null,
    errorIndividualUser: null,
    loading: null,
    error: null,
    pending: null,
  },
  reducers: {
    resetUser: (state) => {
      state.individualUser = null;
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === id) {
          // Create a new object with the updated status and other attributes
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
    updateUserPlant: (state, action) => {
      const updatedPlant = action.payload;

      state.loggedInUser.plants = state.loggedInUser.plants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : Plant
      );
    },
    deleteUserPlant: (state, action) => {
      const deletedPlantId = action.payload;

      state.loggedInUser.plants = state.loggedInUser.plants.filter(
        (plant) => plant.id !== deletedPlantId
      );
    },
    // I probably need to change it for all users, but I don't have all users loaded yet,
    // but it would be changed for individual plant and all plants
    // it loads the individual plant every time someone opens the plant page, but they could still
    // see an errored description or image
    // I as the admin would be the only one able to change it though

    // addPlantToUser: (state, action) => {
    //   const
    // }
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
        // state.individualUser = action.payload;
        state.loggedIn = true;
        state.loggedInUser = action.payload;
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
        state.loggedInUser = null;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserInApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInApi.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
        state.success = true;
      })
      .addCase(updateUserInApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        // state.loggedIn = false;
        state.error = action.error.message;
      })
      .addCase(registerUserInApi.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loggedIn = true;
      })
      .addCase(registerUserInApi.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addPlantToUser.fulfilled, (state, action) => {
        state.loggedInUser.plants.push(action.payload);
      })
      .addCase(addPlantToUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setUser,
  resetUser,
  addUser,
  updateUser,
  deleteUser,
  updateUserPlant,
  deleteUserPlant,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
