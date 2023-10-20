import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchAllEntries = createAsyncThunk(
  "entries/fetchAllEntries",
  async () => {
    try {
      const response = await fetch(`/entries`);
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
      const response = await fetch(`/entries/${entryId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateEntryInApi = createAsyncThunk(
  "entry/updateEntryInApi",
  async ({ entryId, updatedEntry }) => {
    try {
      const response = await fetch(`/entries/${entryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEntry),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update entry failed");
      }

      const updatedEntryData = await response.json();
      return updatedEntryData;
    } catch (error) {
      throw error;
    }
  }
);

export const addEntryToApi = createAsyncThunk(
  "entries/addEntryToApi",
  async ( newEntry ) => {
    try {
      const response = await fetch(`/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to add entry to API");
      }
      console.log("data from addEntry", data)
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteEntryFromApi = createAsyncThunk(
  "entries/deleteEntryFromApi",
  async (entryId) => {
    try {
      const response = await fetch(`/entries/${entryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Entry deleted successfully.");
        return entryId;
      } else {
        throw new Error(`Failed to delete Entry: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

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
    addEntry: (state, action) => {
      state.allEntries.push(action.payload);
    },
    deleteEntry: (state, action) => {
      state.allEntries = state.allEntries.filter(
        (entry) => entry.id !== action.payload
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

        state.allEntries.push(action.payload);
        state.individualEntry = action.payload
        state.loadingIndividualEntry = false;
      })
      .addCase(addEntryToApi.rejected, (state, action) => {
        state.loadingIndividualEntry = false;
        state.errorIndividualEntry = action.error.message;
      })
      .addCase(deleteEntryFromApi.pending, (state, action) => {
        state.loadingIndividualEntry = true;
      })
      .addCase(deleteEntryFromApi.fulfilled, (state, action) => {
        // Assuming action.payload is the commentId of the deleted comment
        const deletedEntryId = action.payload;

        // Update your state to remove the deleted comment by its commentId
        state.allEntries = state.allEntries.filter(
          (entry) => entry.entryId!== deletedEntryId
        );
        
        state.loadingIndividualEntry = false;
      })
      .addCase(deleteEntryFromApi.rejected, (state, action) => {
        state.loadingIndividualEntry = false;
        state.errorIndividualEntry= action.error.message;
      });
  },
});

export const {
  addEntry,
  deleteEntry,
} = entrySlice.actions;

export const entryReducer = entrySlice.reducer;


