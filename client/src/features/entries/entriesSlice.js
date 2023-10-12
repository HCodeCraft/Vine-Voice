import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

const apiUrl = config.API_BASE_URL;

console.log("apiUrl", apiUrl)

export const fetchAllEntries = createAsyncThunk(
  "entries/fetchAllEntries",
  async () => {
    try {
      const response = await fetch(`${apiUrl}/entries`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchEntryById = createAsyncThunk(
  "entries/fetchEntryById",
  async (entryId) => {
    try {
      const response = await fetch(`${apiUrl}/entries/${entryId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addEntryToApi = createAsyncThunk(
  "entries/addEntryToApi",
  async ( newEntry ) => {
    try {
      const response = await fetch(`${apiUrl}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to add entry to API");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);


export const deleteEntryFromApi = async (entryId) => {
  try {
    const response = await fetch(`${apiUrl}/entries/${entryId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Entry deleted successfully.");
    } else {
      console.error("Failed to delete entry:", response.status);
    }
  } catch (error) {
    console.error("An error occurred while deleting the entry:", error);
  }
};

const entrySlice = createSlice({
  name: "entry",
  initialState: {
    allEntries: [],
    individualEntry: null,
    loadingAllEntries: false,
    loadingIndividualEntry: false,
    errorAllEntries: null,
    errorIndividualEntry: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.individualEntry = payload;
    },
    resetCredentials: (state) => {
      state.individualEntry = null;
    },
    addEntry: (state, action) => {
      state.allEntries.push(action.payload);
    },
    deleteEntry: (state, action) => {
      state.allEntries = state.allEntries.filter(
        (entry) => entry.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEntries.pending, (state, action) => {
        state.loadingAllEntries = true;
      })
      .addCase(fetchAllEntries.fulfilled, (state, action) => {
        state.allEntries = action.payload;
        state.loadingAllEntries = false;
      })
      .addCase(fetchAllEntries.rejected, (state, action) => {
        state.loadingAllEntries = false;
        state.errorAllEntries = action.error.message;
      })
      .addCase(fetchEntryById.pending, (state, action) => {
        state.loadingIndividualEntry = true;
      })
      .addCase(fetchEntryById.fulfilled, (state, action) => {
        state.individualEntry = action.payload;
        state.loadingIndividualEntry = false;
      })
      .addCase(fetchEntryById.rejected, (state, action) => {
        state.loadingIndividualEntry = false;
        state.errorIndividualEntry = action.error.message;
      })
      .addCase(addEntryToApi.pending, (state, action) => {
        state.loadingIndividualEntry = true;
      })
      .addCase(addEntryToApi.fulfilled, (state, action) => {
        // Assuming action.payload is an array of entries
        state.allEntries.push(action.payload);
        state.loadingIndividualEntry = false;
      })
      .addCase(addEntryToApi.rejected, (state, action) => {
        state.loadingIndividualEntry = false;
        state.errorIndividualEntry = action.error.message;
      });
  },
});

export const {
  addEntry,
  deleteEntry,
} = entrySlice.actions;

export const entryReducer = entrySlice.reducer;


