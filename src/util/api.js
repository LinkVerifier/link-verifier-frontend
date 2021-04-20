import axios from "axios";
import authHeader from "./Authentication/auth-header"

const API_URL = "http://localhost:8080/";

const link = (linkName, deliveryDate) => {
    return axios
        .post(API_URL + "links", {
            linkName,
            deliveryDate,
        })
        .then((response) => {
            return response.data;
        });
};

const getLinkById = (id) => {
    return axios
        .get(API_URL + `links/${id}`)
        .then((response) => {
            return response.data;
        });
};

const putLike = async (id) => {
    console.log(id);
    return axios
        .put(API_URL + `comments/${id}/like`,{},
        {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const putDisLike = async (id) => {
    return axios
        .put(API_URL + `comments/${id}/dislike`,{},
        {
            headers: authHeader()
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

const getUserById = async (id) => {
    return axios
        .get(API_URL + `users/${id}`)
        .then((response) => {
            return response.data;
        });
};

const newComment = (id, comment, date, opinion) => {
    return axios
        .post(API_URL + `links/${id}/comments`, {
            comment,
            date,
            opinion
        },{
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const api = {
    link,
    getLinkById,
    getUserById,
    newComment,
    putLike,
    putDisLike,
};
  
export default api;