import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${baseUrl}posts`)
            .then(res => {
                const array = res.data.slice(0, num);
                dispatch({ type: GET_POSTS, payload: array })
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

export const unlike_post = (postId, userId) => {
    return (dispatch) => {
        return axios
            .patch(`${baseUrl}posts/unlike-post/${postId}`, { id: userId })
            .then(res => {
                dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios
            .put(`${baseUrl}posts/${postId}`, { message: message })
            .then(res => {
                dispatch({
                    type: UPDATE_POST, payload: { message, postId }
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
};