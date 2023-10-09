// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import config from "../../config";

const apiUrl = config.API_BASE_URL;

// create an async thunk for login and logout,
/// the login would take the username and password and send it to the login action



  
  const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
  }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {

  },
});
export default authSlice.reducer;
