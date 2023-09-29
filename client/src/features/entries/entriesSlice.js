import { apiSlice } from "../api/apiSlice";

export const extendedEntriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEntries: builder.query({
      query: () => "/entries",
      transformResponse: (responseData) => {
        console.log(responseData)
        return responseData; 
      },
      providesTags: ["Entry"],
    }),
  }),
});


export const {
    useGetEntriesQuery,
    // Add other hooks for mutations or other queries
  } = extendedEntriesApiSlice;