import { combineReducers } from "redux";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";
import plantReucer from "./features/plants/plantSlice"

// I know I need to replace the get queries that apiSlice exports

const rootReducer = combineReducers({
  user: userReducer, // Add your data entity reducers here
  auth: authReducer,
  plant: plantSlice
});

export default rootReducer;
