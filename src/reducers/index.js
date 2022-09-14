import { combineReducers } from "redux";
import userReducer from "./User.reducer";
import usersReducer from "./Users.reducer";
import postReducer from "./Post.reducer";

export default combineReducers({
    userReducer, usersReducer, postReducer
});