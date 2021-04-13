import axios from "axios";

const API_URL = "http://localhost:8080/";
const user = JSON.parse(localStorage.getItem('user'));

const link = (linkName, deliveryDate) => {
    return axios
        .post(API_URL + "", {
            linkName,
            deliveryDate,
        })
        .then((response) => {
            return response.data;
        });
};

const getLinkInfo = (id) => {
    return axios
        .get(API_URL + `links/${id}`)
        .then((response) => {
            return response.data;
        });
};

const newComment = (id, comment, date, opinion) => {
    return axios
        .post(API_URL + `links/${id}`, {
            comment,
            date,
            opinion
        },{
            headers:{
                Authorization: 'Bearer ' + user.token
            }
        })
        .then((response) => {
            return response.data;
        });
};

const api = {
    link,
    getLinkInfo,
    newComment
};
  
export default api;