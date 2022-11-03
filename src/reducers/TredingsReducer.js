import { GET_TRENDS } from "../actions/PostActions";

const initialState = {};

export default function tredingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return action.payload
        default:
            return state;
    }
}