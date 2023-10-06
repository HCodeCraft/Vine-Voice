import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Plant", "Entry", "User"],
  endpoints: (builder) => ({}),
});


export const { useGetPlantsQuery, useGetEntriesQuery } = apiSlice;


