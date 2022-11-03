import { combineReducers } from "redux";
import userReducer from "./User.reducer";
import usersReducer from "./Users.reducer";
import postReducer from "./Post.reducer";
import allPostsReducer from "./AllPostsReducer";
import tredingReducer from "./TredingsReducer";

export default combineReducers({
    userReducer, usersReducer, postReducer, allPostsReducer, tredingReducer
});