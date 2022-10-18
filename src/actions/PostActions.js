import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// Comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios
            .delete(`${baseUrl}posts/${postId}`)
            .then(res => {
                dispatch({
                    type: DELETE_POST, payload: { postId }
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios
            .patch(`${baseUrl}posts/comment-post/${postId}`, { commenterId, text, commenterPseudo })
            .then(res => {
                dispatch({ type: ADD_COMMENT, payload: { postId } })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios
            .patch(`${baseUrl}posts/edit-comment-post/${postId}`, { commentId, text })
            .then(res => {
                dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios
            .patch(`${baseUrl}posts/delete-comment-post/${postId}`, { commentId })
            .then(res => {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}