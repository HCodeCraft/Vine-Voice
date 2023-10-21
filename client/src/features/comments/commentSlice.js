import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCommentToEntry, deleteCommentFromEntry, updateCommentInEntry } from "../entries/entriesSlice";



export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async () => {
    try {
      const response = await fetch(`/comments`);
      const data = await response.json();
      console.log("data from fetchAllComments", data);
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
    'comments/addCommentToApi',
    async (newComment, thunkAPI) => {
     
      try {
        const response = await fetch(`/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add comment to API');
        }
        const data = await response.json();
        thunkAPI.dispatch(addCommentToEntry(data))
        return data;
      } catch (error) {
        throw error;
      }
    }
  );

export const updateCommentInApi = createAsyncThunk(
  "comment/updateCommentInApi",
  async ({ commentId, updatedComment }, thunkAPI) => {
    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update comment failed");
      }

      const updatedCommentData = await response.json();
      thunkAPI.dispatch(updateCommentInEntry(updatedCommentData))
      return updatedCommentData;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCommentFromApi = createAsyncThunk(
  "comments/deleteCommentFromApi",
  async (commentId, thunkAPI) => {
    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        thunkAPI.dispatch(deleteCommentFromEntry(commentId))
        console.log("Comment deleted successfully.");
        return commentId;
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
        const newComment = action.payload;

        state.allComments.push(newComment);
        state.individualComment = action.payload
        

        state.loadingIndividualComment = false;
      })
      .addCase(addCommentToApi.rejected, (state, action) => {
        state.loadingIndividualComment = false;
        state.errorIndividualComment = action.error.message;
      })
      .addCase(updateCommentInApi.pending, (state, action) => {
        state.loadingIndividualComment = true;
      })
      .addCase(updateCommentInApi.fulfilled, (state, action) => {
        // Assuming action.payload is the updated comment
        const updatedComment = action.payload;

        // Update the individualComment
        state.individualComment = updatedComment;

        // Update the allComments array by mapping over it and replacing the updated comment
        state.allComments = state.allComments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        );

        state.loadingIndividualComment = false;
      })
      .addCase(updateCommentInApi.rejected, (state, action) => {
        state.loadingIndividualComment = false;
        state.errorIndividualComment = action.error.message;
      })
      .addCase(deleteCommentFromApi.pending, (state, action) => {
        state.loadingIndividualComment = true;
      })
      .addCase(deleteCommentFromApi.fulfilled, (state, action) => {
        // Assuming action.payload is the commentId of the deleted comment
        const deletedCommentId = action.payload;

        // Update your state to remove the deleted comment by its commentId
        state.allComments = state.allComments.filter(
          (comment) => comment.id !== deletedCommentId
        );

        state.loadingIndividualComment = false;
      })
      .addCase(deleteCommentFromApi.rejected, (state, action) => {
        state.loadingIndividualComment = false;
        state.errorIndividualComment = action.error.message;
      });
  },
});

export const { addComment, deleteComment } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
