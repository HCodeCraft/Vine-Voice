import { combineReducers } from "redux";
import { userReducer} from "../features/users/userSlice";
import { plantReducer} from "../features/plants/plantSlice"
import { entryReducer } from "../features/entries/entriesSlice";
import { commentReducer } from "../features/comments/commentSlice";


const rootReducer = combineReducers({
  user: userReducer, 
  plant: plantReducer,
  entry: entryReducer,
  comment: commentReducer
});

export default rootReducer;
