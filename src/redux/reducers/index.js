import userReducer from "./userReducer/userReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: userReducer,
});

export default allReducers;
