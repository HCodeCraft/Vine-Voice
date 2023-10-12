import { combineReducers } from "redux";
import { userReducer} from "../features/users/userSlice";
import { plantReducer} from "../features/plants/plantSlice"
import { entryReducer } from "../features/entries/entriesSlice";



// I know I need to replace the get queries that apiSlice exports

const rootReducer = combineReducers({
  user: userReducer, // Add your data entity reducers here
  plant: plantReducer,
  entry: entryReducer
});

export default rootReducer;
