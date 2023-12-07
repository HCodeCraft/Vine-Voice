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
  async ({ newPlant }) => {
    try {
      const response = await fetch(`/plants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }


      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);





export const updatePlantInApi = createAsyncThunk(
  "user/updatePlantInApi",
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
        throw new Error(JSON.stringify(errorData))
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
    const entry = getState().entry.individualEntry;

    return entry;
  }
);

export const deletePlantFromApi = createAsyncThunk(
  "plants/deletePlantFromApi",
  async (plantId, thunkAPI) => {
    try {
      const response = await fetch(`/plants/${plantId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        thunkAPI.dispatch(deleteUserPlant(plantId));
        return plantId;
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
    clearPlants: (state) => {
      state.allPlants = [];
      state.individualPlant = null;
      state.loadingAllPlants = false;
      state.loadingIndividualPlant = false;
      state.errorAllPlants = null;
      state.errorIndividualPlant = null;
      state.error = null;
    },
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

      state.plant.individualPlant.entries =
        state.plant.individualPlant.entries.map((entry) =>
          entry.id === updatedEntry.id ? updatedEntry : entry
        );
    },
    deleteEntryInPlant: (state, action) => {
      const deletedEntryId = action.payload;

      const updatedEntries = state.individualPlant.entries.filter(
        (entry) => entry.id !== deletedEntryId
      );

      state.individualPlant.entries = updatedEntries;
      state.allPlants = state.allPlants.map((plant) =>
        plant.id === state.individualPlant.id
          ? { ...plant, entries: updatedEntries }
          : plant
      );
    },

    filterOutUserEntries: (state, action) => {
      const deletedUserId = action.payload;

      state.allPlants = state.allPlants.map((plant) => ({
        ...plant,
        entries: plant.entries.filter(
          (entry) => entry.user_id !== deletedUserId
        ),
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
        if (action.payload.plant) {
          state.allPlants = [...state.allPlants, action.payload.plant];
        } else {
          state.allPlants = [...state.allPlants, action.payload];
        }

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
        const deletedPlantId = action.payload;

        state.allPlants = state.allPlants.filter(
          (plant) => plant.id !== deletedPlantId
        );
      })
      .addCase(addEntryToPlant.fulfilled, (state, action) => {
        const plantId = action.payload.plant_id;
        const entry = action.payload;

        state.individualPlant?.entries.push(entry);

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
  filterOutUserEntries,
  clearPlants,
} = plantSlice.actions;

export const plantReducer = plantSlice.reducer;
