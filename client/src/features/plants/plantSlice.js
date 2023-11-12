import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserPlant } from "../users/userSlice";
import { deleteUserPlant } from "../users/userSlice";

export const fetchAllPlants = createAsyncThunk(
  "plants/fetchAllPlants",
  async () => {
    try {
      const response = await fetch(`/plants`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPlantById = createAsyncThunk(
  "plants/fetchPlantById",
  async (plantId) => {
    try {
      const response = await fetch(`/plants/${plantId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addPlantToApi = createAsyncThunk(
  "plants/addPlantToApi",
  async (newPlant) => {
    try {
      const response = await fetch(`/plants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });

      if (!response.ok) {
        throw new Error("Failed to add plant to API");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePlantInApi = createAsyncThunk(
  "user/updateUserInApi",
  async ({ plantId, updatedPlant }, thunkAPI) => {
    try {
      const response = await fetch(`/plants/${plantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlant),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update plant failed");
      }

      const updatedPlantData = await response.json();
      thunkAPI.dispatch(updateUserPlant(updatedPlantData));
      return updatedPlantData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Update plant failed");
    }
  }
);

export const addEntryToPlant = createAsyncThunk(
  "user/addEntryPlant",
  (_, { getState }) => {
    // get the entry's plant and add that plant to the loggedInUser.plants array
    // what does this function need to know? The entry info (state.entry.individualEntry)
    const entry = getState().entry.individualEntry;

    return entry;
  }
);

// want to make this availible only to admin
export const deletePlantFromApi = createAsyncThunk(
  "plants/deletePlantFromApi",
  async (plantId, thunkAPI) => {
    try {
      const response = await fetch(`/plants/${plantId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        thunkAPI.dispatch(deleteUserPlant(plantId));
        console.log("Plant deleted successfully.");
        return plantId
      } else {
        throw new Error(`Failed to delete plant: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

const plantSlice = createSlice({
  name: "plant",
  initialState: {
    allPlants: [],
    individualPlant: null,
    loadingAllPlants: false,
    loadingIndividualPlant: false,
    errorAllPlants: null,
    errorIndividualPlant: null,
    error: null,
  },
  reducers: {
    addPlant: (state, action) => {
      state.allPlants.push(action.payload);
    },
    deletePlant: (state, action) => {
      state.allPlants = state.allPlants.filter(
        (plant) => plant.id !== action.payload.id
      );
    },
    updateEntryInPlant: (state, action) => {
      const updatedEntry = action.payload;
  
      // Update the plant's entries with updatedEntry
      state.plant.individualPlant.entries = state.plant.individualPlant.entries.map(
        (entry) => (entry.id === updatedEntry.id ? updatedEntry : entry)
      );
    },
    deleteEntryInPlant: (state, action) => {
      const deletedEntryId = action.payload;
      console.log("deletedEntryId from deleteEntryInPlant", deletedEntryId);

      // Remove the entry from individualPlant.entries
      const updatedEntries = state.individualPlant.entries.filter(
        (entry) => entry.id !== deletedEntryId
      );

      // Update the state in an immutable way using immer
      state.individualPlant.entries = updatedEntries;
      state.allPlants = state.allPlants.map((plant) =>
        plant.id === state.individualPlant.id
          ? { ...plant, entries: updatedEntries }
          : plant
      );
    },
  
  
    filterOutUserEntries: (state, action) => {
      const deletedUserId = action.payload;
      console.log("deletedUserId from filterOutUserEntries", deletedUserId)
  
      // Update each plant's entries by filtering out entries with deletedUserId
      state.allPlants = state.allPlants.map((plant) => ({
        ...plant,
        entries: plant.entries.filter((entry) => entry.user_id !== deletedUserId),
      }));
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlants.pending, (state, action) => {
        state.loadingAllPlants = true;
      })
      .addCase(fetchAllPlants.fulfilled, (state, action) => {
        state.allPlants = action.payload;
        state.loadingAllPlants = false;
      })
      .addCase(fetchAllPlants.rejected, (state, action) => {
        state.loadingAllPlants = false;
        state.errorAllPlants = action.error.message;
      })
      .addCase(fetchPlantById.pending, (state, action) => {
        state.loadingIndividualPlant = true;
      })
      .addCase(fetchPlantById.fulfilled, (state, action) => {
        state.individualPlant = action.payload;
        state.loadingIndividualPlant = false;
      })
      .addCase(fetchPlantById.rejected, (state, action) => {
        state.loadingIndividualPlant = false;
        state.errorIndividualPlant = action.error.message;
      })
      .addCase(addPlantToApi.pending, (state, action) => {
        state.loadingIndividualPlant = true;
      })
      .addCase(addPlantToApi.fulfilled, (state, action) => {
        // Assuming action.payload is an array of plants
        state.allPlants.push(action.payload);
        state.loadingIndividualPlant = false;
      })

      .addCase(addPlantToApi.rejected, (state, action) => {
        state.loadingIndividualPlant = false;
        state.errorIndividualPlant = action.error.message;
      })
      .addCase(updatePlantInApi.fulfilled, (state, action) => {
        state.individualPlant = action.payload;

        const updatedPlant = state.individualPlant;

        state.allPlants = state.allPlants.map((plant) =>
          plant.id === updatedPlant.id ? updatedPlant : plant
        );
      })
      .addCase(deletePlantFromApi.fulfilled, (state, action) => {
        // delete from allPlants,
        const deletedPlantId = action.payload


        state.allPlants = state.allPlants.filter(
          (plant) => plant.id !== deletedPlantId
        );

        // delete from userPlants (do I need to include deleting the entries and comments?)
      })
      .addCase(addEntryToPlant.fulfilled, (state, action) => {
        const plantId = action.payload.plant_id;
        const entry = action.payload;

        // Update the individualPlant with the new entry
        state.individualPlant.entries.push(entry);

        // Find the plant and update it with the new entry in allPlants
        const plantToUpdate = state.allPlants.find(
          (plant) => plant.id === plantId
        );

        if (plantToUpdate) {
          if (!plantToUpdate.entries) {
            plantToUpdate.entries = [];
          }
          plantToUpdate.entries.push(entry);
        }
      })

      .addCase(addEntryToPlant.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  addPlant,
  updatePlant,
  deletePlant,
  updateEntryInPlant,
  deleteEntryInPlant,
  filterOutUserEntries
} = plantSlice.actions;

export const plantReducer = plantSlice.reducer;
