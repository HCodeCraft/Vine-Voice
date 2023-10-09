import { apiSlice } from "../api/apiSlice";

export const extendedEntriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEntries: builder.query({
      query: ({ plantId }) => `/plants/${plantId}/entries/`,
      transformResponse: (responseData) => {
        console.log(responseData);
        return responseData;
      },
      providesTags: ["Entry"],
    }),
    getEntryQuery: builder.query({
      query: ({ plantId, entryId }) => `/plants/${plantId}/entries/${entryId}`,
      providesTags: (result, error, { plantId, entryId }) => [
        { type: 'Entry', id: entryId },
        { type: 'Plant', id: plantId }, // Optionally invalidate the plant cache
      ],
    }),
    addNewEntry: builder.mutation({
      query: ({ plantId, initialEntry }) => ({
        url: `/plants/${plantId}/entries`,
        method: "POST",
        body: initialEntry,
      }),
      invalidatesTags: ["Entry"],
    }),
    updateEntry: builder.mutation({
      query: ({ plantId, entryId, initialEntry }) => ({
        url: `/plants/${plantId}/entries/${entryId}`,
        method: "PUT",
        body: initialEntry,
      }),
      invalidatesTags: ["Entry"],
    }),
    deleteEntry: builder.mutation({
      query: ({ plantId, id }) => ({
        url: `/plants/${plantId}/entries/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Entry"],
    }),
  }),
});

export const {
  useGetEntriesQuery,
  useGetEntryQuery,
  useAddNewEntryMutation,
  useUpdateEntryMutation,
  useDeleteEntryMutation,
} = extendedEntriesApiSlice;

