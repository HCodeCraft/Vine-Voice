import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateEntryInPlant } from "../plants/plantSlice";

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
  async ({ entryId, updatedEntry }, thunkAPI) => {
    try {
      const response = await fetch(`/entries/${entryId}`, {
        method: "PATCH",
        body: updatedEntry,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const updatedEntryData = {};
      updatedEntry.forEach((value, key) => {
        updatedEntryData[key] = value;
      });

      const indPlant = thunkAPI.getState().plant.individualPlant;

      thunkAPI.dispatch(updateEntryInPlant(updatedEntryData));
      return updatedEntryData;
    } catch (error) {
      throw error;
    }
  }
);

export const addEntryToApi = createAsyncThunk(
  "entries/addEntryToApi",
  async (newEntry) => {
    try {
      let requestBody;

      if (newEntry instanceof FormData) {
        requestBody = {
          method: "POST",
          body: newEntry,
        };
      } else {
        requestBody = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        };
      }

      const response = await fetch("/entries", requestBody);

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
    clearEntries: (state) => {
      state.allEntries = [];
      state.individualEntry = null;
      state.loadingAllEntries = false;
      state.loadingIndividualEntry = false;
      state.errorAllEntries = null;
      state.errorIndividualEntry = null;
    },
    addEntry: (state, action) => {
      state.allEntries.push(action.payload);
    },
    deleteEntry: (state, action) => {
      state.allEntries = state.allEntries.filter(
        (entry) => entry.id !== action.payload
      );
    },
    addCommentToEntry: (state, action) => {
      state.individualEntry.comments.push(action.payload);
    },
    deleteCommentFromEntry: (state, action) => {
      state.individualEntry.comments = state.individualEntry.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    updateCommentInEntry: (state, action) => {
      const updatedComment = action.payload;

      state.individualEntry.comments = state.individualEntry.comments.map(
        (comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
      );
    },
    addEntryToAllAndIndState: (state, action) => {
      const newEntry = action.payload;

      state.allEntries.push(newEntry);
      state.individualEntry = newEntry;
      state.loadingIndividualEntry = false;
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
        const newEntry = action.payload;

        state.allEntries.push(newEntry);

        state.individualEntry = newEntry;

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
        const deletedEntryId = action.payload;

        state.allEntries = state.allEntries.filter(
          (entry) => entry.entryId !== deletedEntryId
        );

        // state.individualEntry = null

        state.loadingIndividualEntry = false;
      })
      .addCase(deleteEntryFromApi.rejected, (state, action) => {
        state.loadingIndividualEntry = false;
        state.errorIndividualEntry = action.error.message;
      })
      .addCase(updateEntryInApi.fulfilled, (state, action) => {
        const updatedEntry = action.payload;

        state.individualEntry = updatedEntry;

        state.allEntries = state.allEntries.map((entry) =>
          entry.id === updatedEntry.id ? updatedEntry : entry
        );

        state.loadingIndividualEntry = false;
      })
      .addCase(updateEntryInApi.rejected, (state, action) => {
        state.loadingIndividualEntry = false;
        state.errorIndividualEntry = action.error.message;
      });
  },
});

export const {
  addEntry,
  deleteEntry,
  addCommentToEntry,
  deleteCommentFromEntry,
  updateCommentInEntry,
  addEntryToAllAndIndState,
  clearEntries,
} = entrySlice.actions;

export const entryReducer = entrySlice.reducer;
