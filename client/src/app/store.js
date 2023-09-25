import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, apiSearchSlice, detailsSlice } from "../features/api/apiSlice";



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})