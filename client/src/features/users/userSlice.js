import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }) => {
    try {
      const response = await fetch(`/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.error(`Login failed with status: ${response.status}`);
        const errorText = await response.text();
        console.error(`Error response text: ${errorText}`);
        throw new Error("Login failed");
      }

      const user = await response.json();

      if (user.error) {
        throw new Error("Invalid Username or Password");
      }

      return user;
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw error;
    }
  }
);



// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async ({ username, password }) => {
//     try {
//       const response = await fetch(`/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const user = await response.json();
//       if (user.error) {
//         throw new Error("Invalid Username or Password");
//       }

//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const logoutUser = createAsyncThunk("user/logout", async (_) => {
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

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_) => {
    try {
      const response = await fetch(`/me`);

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "fetchUserData failed");
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

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
      const response = await fetch(`/users`, { method: "POST", body: newUser });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      return response.json();
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
          return { ...user, ...updates };
        }
        return user; 
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
      const deletedPlantId = action.payload.id;

      state.loggedInUser.plants = state.loggedInUser.plants.filter(
        (plant) => plant.id !== deletedPlantId
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
      })
      .addCase(deleteUserFromApi.fulfilled, (state, action) => {
        const deletedUserId = action.payload;

        state.allUsers = state.allUsers.filter(
          (user) => user.id !== deletedUserId
        );

        if (state.loggedInUser?.id === deletedUserId) {
          state.loggedInUser = null;
          state.loggedIn = null;
        }
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
