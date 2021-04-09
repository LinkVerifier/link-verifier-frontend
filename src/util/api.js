import axios from "axios";

const API_URL = "http://localhost:8080/";

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

const api = {
    link,
    getLinkInfo
};
  
export default api;