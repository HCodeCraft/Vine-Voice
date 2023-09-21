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

const apiSearchSlice = createApi({
  reducerPath: "apiSearch",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://perenual.com/api/species-list",
  }),
  endpoints: (builder) => ({
    getSpeciesList: builder.query({
      query: ({ query }) => {
        return `?key=${process.env.REACT_APP_API_KEY}&q=${query}`;
      },
      transformResponse: (responseData) => {
        return responseData; // Return the data as-is
      },
      providesTags: ["SpeciesList"], 
    }),
  }),
});

export const { useGetSpeciesListQuery } = apiSearchSlice;



const detailsSlice = createApi({
  reducerPath: "details",
  baseQuery: fetchBaseQuery({ baseUrl: "https://perenual.com/api/species/details" }),
  endpoints: (builder) => ({
    getSpeciesDetails: builder.query({
      query: (dynamicPart) => ({
        url: `${dynamicPart}`,
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }),
      transformResponse: (responseData) => {
        return responseData; 
      },
      providesTags: ["Species"], 
    }),
  }),
});

export const { useGetSpeciesDetailsQuery } = detailsSlice;

// Would put this in the component i'm calling it in: const { data, isLoading, isSuccess, isError, error } = useGetSpeciesDetailsQuery("7901");
