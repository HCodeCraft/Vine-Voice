import { configureStore } from "@reduxjs/toolkit";
import  rootReducer from './rootReducer'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    reducer: rootReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)



export const store = configureStore({
   reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), devTools: true
})

// in Production, we'll want devtools to be false