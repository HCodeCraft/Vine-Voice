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

export const registerUserInApi = createAsyncThunk(
  "user/registerUserInApi",
  async (newUser) => {
    try {
      const response = await fetch(`/users`, {
        method: "POST",
        body: newUser,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors); // assuming errors are in JSON format
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
    const response = await fetch(`/users/${userId}`, {
      method: "PATCH",
      body: updatedUser,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Update user failed");
    }

    const updatedUserData = await response.json();
    console.log("updatedUserData in api data", updatedUserData);
    return updatedUserData;
  }
);

export const deleteUserFromApi = createAsyncThunk(
  "users/deleteUserFromApi",
  async (user) => {
    try {
      const response = await fetch(`/users/${user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("User deleted successfully.");
        return user.id;
      } else {
        throw new Error(`Failed to delete plant: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const addPlantToUser = createAsyncThunk(
  "user/addPlantToUser",
  (_, { getState }) => {
    const entry = getState().entry.individualEntry;
    console.log("entry from addPlantToUser", entry);
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
        plant.id === updatedPlant.id ? updatedPlant : plant
      );
    },
    deleteUserPlant: (state, action) => {
      console.log("Deleting plant with ID:", action.payload.id);

      const deletedPlantId = action.payload.id;

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
        console.log("addPlantToUser was successful!", action.payload);
        state.loggedInUser.plants.push(action.payload);
      })
      .addCase(addPlantToUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUserFromApi.fulfilled, (state, action) => {
        // delete from allPlants
        console.log("action.payload from addcase", action.payload);
        const deletedUserId = action.payload;

        // if the user who deleted it was logged in, set loggedInUser to null

        // CANNOT READ PROPERTIES OF NULL (id) bc there is no user by then?
        // filter out the deleted user from allUsers

        state.allUsers = state.allUsers.filter(
          (user) => user.id !== deletedUserId
        );

        if (state.loggedInUser.id === deletedUserId) {
          state.loggedInUser = null;
          state.loggedIn = null;
        }

        // not working
      })
      .addCase(deleteUserFromApi.rejected, (state, action) => {
        console.log("There was a problem with deleteUserFromApi");
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
