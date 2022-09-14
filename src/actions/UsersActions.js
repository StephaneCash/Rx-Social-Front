import axios from "axios";
import { baseUrl } from "../base/BaseUrl";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${baseUrl}users`)
            .then(res => {
                dispatch({ type: GET_USERS, payload: res.data });
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};