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


