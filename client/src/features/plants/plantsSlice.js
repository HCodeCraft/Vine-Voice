import { apiSlice } from "../api/apiSlice";



export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: () => "/plants",
      transformResponse: (responseData) => {
        return responseData; 
      },
      providesTags: ["Plant"], 
    }),
    getPlantQuery: builder.query({
      query: (plantId) => `/plants/${plantId}`,
      providesTags: (result, error, arg) => [{ type: 'Plant', id: arg }],
      transformResponse: (responseData) => {
        return responseData; 
      },

    }),
    addNewPlant: builder.mutation({
      query: (initialPlant) => ({
        url: "/plants",
        method: "POST",
        body: initialPlant,
      }),
      invalidatesTags: ["Plant"], 
    }),
    updatePlant: builder.mutation({
      query: (initialPlant) => ({
        url: `/plants/${initialPlant.id}`,
        method: "PUT",
        body: initialPlant,
      }),
      invalidatesTags: ["Plant"], 
    }),
    deletePlant: builder.mutation({
      query: ({ id }) => ({
        url: `/plants/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Plant"], 
    }),
  }),
});

export const {
  useGetPlantsQuery,
  useGetPlantQuery,
  useAddNewPlantMutation,
  useUpdatePlantMutation,
  useDeletePlantMutation,
} = extendedApiSlice;

