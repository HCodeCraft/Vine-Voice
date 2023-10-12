import { combineReducers } from "redux";
import { userReducer} from "../features/users/userSlice";
import { plantReducer} from "../features/plants/plantSlice"



// I know I need to replace the get queries that apiSlice exports

const rootReducer = combineReducers({
  user: userReducer, // Add your data entity reducers here
  plant: plantReducer
});

export default rootReducer;
