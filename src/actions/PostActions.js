import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

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

export const like_post = (postId, userId) => {
    return (dispatch) => {
        return axios
            .patch(`${baseUrl}posts/like-post/${postId}`, { id: userId })
            .then(res => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } });
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}