import { combineReducers } from "redux";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";

// I know I need to replace the get queries that apiSlice exports

const rootReducer = combineReducers({
  user: userReducer, // Add your data entity reducers here
  auth: authReducer,
});

export default rootReducer;
