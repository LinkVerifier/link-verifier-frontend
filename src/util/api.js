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
    return axios({
        method: 'post',
        url: API_URL + `links/${id}`,
        data: {
            comment: comment,
            date: date,
            opinion: opinion,
        },
        headers: {
            Authorization: 'Bearer ' + user.token
        }
    }).catch(error => {
        console.log(error);
    }).then((response) => {
        return response.data;
    });
};

const api = {
    link,
    getLinkInfo,
    newComment
};
  
export default api;