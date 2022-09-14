import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${baseUrl}users/${uid}`)
            .then((resp) => {
                dispatch({ type: GET_USER, payload: resp.data });
            })
            .catch(err => {
                console.log(err.response);
            })
    }
};

export const uploadPicture = (data, id, config) => {
    return (dispatch) => {
        return axios
            .post(`${baseUrl}users/upload`, data, config)
            .then(resp => {
                return axios
                    .get(`${baseUrl}users/${id}`)
                    .then(response => {
                        dispatch({ type: UPLOAD_PICTURE, payload: response.data.picture })
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
};

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios
            .put(`${baseUrl}users/${userId}`, { bio: bio })
            .then((resp) => {
                dispatch({ type: UPDATE_BIO, payload: resp.data.docs.bio })
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios
            .patch(`${baseUrl}users/follow/${followerId}`, { idToFollow: idToFollow })
            .then(resp => {
                dispatch({ type: FOLLOW_USER, payload: { idToFollow } })
            })
            .catch(err => {
                console.log(err.response);
            })
    };
};