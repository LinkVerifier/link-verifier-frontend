import axios from "axios";

const API_URL = "http://localhost:8080/";

const link = (link, deliveryDate) => {
    return axios
        .post(API_URL + "", {
            link,
            deliveryDate,
        })
        .then((response) => {
            return response.data;
        });
};

const api = {
    link
};
  
export default api;