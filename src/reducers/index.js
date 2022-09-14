import { combineReducers } from "redux";
import userReducer from "./User.reducer";
import usersReducer from "./Users.reducer";

export default combineReducers({
    userReducer, usersReducer
});