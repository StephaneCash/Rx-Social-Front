import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

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
    console.log(data)
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
}