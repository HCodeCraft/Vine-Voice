import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ["Plant"],
  endpoints: (builder) => ({
    // Define your API endpoints for the "apiSlice"
  }),
});

export const { useGetPlantsQuery } = apiSlice;

export const entriesApiSlice = createApi({
  reducerPath: 'entriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Entry'],
  endpoints: (builder) => ({
    // Define your entry-related endpoints for the "entriesApiSlice"
  }),
});

export const { useGetEntriesQuery } = entriesApiSlice;

