import { apiSlice } from "../api/apiSlice";



export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: () => "/plants",
      transformResponse: (responseData) => {
        console.log("responseData", responseData)
        return responseData; // Return the data as-is
      },
      providesTags: ["Plant"], // Use the correct type "Plant"
    }),
    getPlantsByPlantId: builder.query({
      query: (id) => `/plants/?plantId=${id}`,
      transformResponse: (responseData) => {
        return responseData; // Return the data as-is
      },
      providesTags: ["Plant"], // Use the correct type "Plant"
    }),
    addNewPlant: builder.mutation({
      query: (initialPlant) => ({
        url: "/plants",
        method: "POST",
        body: initialPlant,
      }),
      invalidatesTags: ["Plant"], // Use the correct type "Plant"
    }),
    updatePlant: builder.mutation({
      query: (initialPlant) => ({
        url: `/plants/${initialPlant.id}`,
        method: "PUT",
        body: initialPlant,
      }),
      invalidatesTags: ["Plant"], // Use the correct type "Plant"
    }),
    deletePlant: builder.mutation({
      query: ({ id }) => ({
        url: `/plants/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Plant"], // Use the correct type "Plant"
    }),
  }),
});

export const {
  useGetPlantsQuery,
  useGetPlantsByPlantIdQuery,
  useAddNewPlantMutation,
  useUpdatePlantMutation,
  useDeletePlantMutation,
} = extendedApiSlice;

