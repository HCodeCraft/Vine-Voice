import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

// const apiUrl = config.API_BASE_URL;

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

// Not sure I would want to use this except for switching the api plant
// export const updatePlantInApi = createAsyncThunk(
//   "user/updateUserInApi",
//   async ({ plantId, updatedPlant }) => {
//     try {
//       const response = await fetch(`${apiUrl}/users/${plantId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPlant),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Update plant failed");
//       }

//       const updatedPlantData = await response.json();
//       return updatedPlantData;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// want to make this availible only to admin
export const deletePlantFromApi = createAsyncThunk(
  "plants/deletePlantFromApi",
  async (plantId) => {
    try {
      const response = await fetch(`/plants/${plantId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Plant deleted successfully.");
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
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.individualPlant = payload;
    },
    resetCredentials: (state) => {
      state.individualPlant = null;
    },
    addPlant: (state, action) => {
      state.allPlants.push(action.payload);
    },
    // updatePlant: (state, action) => {
    //   const { id, updatedPlant } = action.payload;
    //   const plantToUpdate = state.allPlants.find((plant) => plant.id === id);
    //   if (plantToUpdate) {
    //     plantToUpdate = updatedPlant;
    //   }
    // },
    deletePlant: (state, action) => {
      state.allPlants = state.allPlants.filter(
        (plant) => plant.id !== action.payload.id
      );
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
      });
  },
});

export const {
  addPlant,
  updatePlant,
  deletePlant,
} = plantSlice.actions;

export const plantReducer = plantSlice.reducer;


