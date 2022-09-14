import { FOLLOW_USER, GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/UserActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }
        default:
            return state;
    }
};