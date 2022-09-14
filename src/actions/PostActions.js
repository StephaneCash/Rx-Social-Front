import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${baseUrl}posts`)
            .then(res => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};