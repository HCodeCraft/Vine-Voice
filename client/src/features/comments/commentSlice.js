import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async () => {
    try {
      const response = await fetch(`/comments`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (commentId) => {
    try {
      const response = await fetch(`/comments/${commentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addCommentToApi = createAsyncThunk(
  "comments/addCommentToApi",
  async (newComment) => {
    try {
      const response = await fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment to API");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCommentFromApi = createAsyncThunk(
    "comments/deleteCommentFromApi",
    async (commentId) => {
      try {
        const response = await fetch(`/comments/${commentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Comment deleted successfully.");
        } else {
          throw new Error(`Failed to delete comment: ${response.status}`);
        }
      } catch (error) {
        throw error;
      }
    }
  );

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    allComments: [],
    individualComment: null,
    loadingAllComments: false,
    loadingIndividualComment: false,
    errorAllComments: null,
    errorIndividualComment: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.individualComment = payload;
    },
    resetCredentials: (state) => {
      state.individualComment = null;
    },
    addComment: (state, action) => {
      state.allComments.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.allComments = state.allComments.filter(
        (comment) => comment.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state, action) => {
        state.loadingAllComments = true;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.allComments = action.payload;
        state.loadingAllComments = false;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loadingAllComments = false;
        state.errorAllComments = action.error.message;
      })
      .addCase(fetchCommentById.pending, (state, action) => {
        state.loadingIndividualComment = true;
      })
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.individualComment = action.payload;
        state.loadingIndividualComment = false;
      })
      .addCase(fetchCommentById.rejected, (state, action) => {
        state.loadingIndividualComment = false;
        state.errorIndividualComment = action.error.message;
      })
      .addCase(addCommentToApi.pending, (state, action) => {
        state.loadingIndividualComment = true;
      })
      .addCase(addCommentToApi.fulfilled, (state, action) => {
        // Assuming action.payload is an array of comments
        state.allComments.push(action.payload);
        state.loadingIndividualComment = false;
      })
      .addCase(addCommentToApi.rejected, (state, action) => {
        state.loadingIndividualComment = false;
        state.errorIndividualComment = action.error.message;
      });
  },
});

export const {
  addComment,
  deleteComment,
} = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
